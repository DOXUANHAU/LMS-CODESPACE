import React, { useContext, useEffect, useMemo, useState } from "react";
import { Form, Modal, Select, Spin, Avatar } from "antd";
import { AppContext } from "../../../../../context/AppProvider";
import { debounce } from "lodash";
import { db } from "../../../../../firebase/config";
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";

// Component chọn thành viên với debounce tìm kiếm
function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value) => {
      if (!value.trim()) return; // Không tìm kiếm nếu không có input
      setFetching(true);
      setOptions([]);

      try {
        const newOptions = await fetchOptions(value, curMembers);
        setOptions(newOptions);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      } finally {
        setFetching(false);
      }
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  useEffect(() => {
    return () => {
      setOptions([]); // Clear options khi component bị unmount
    };
  }, []);

  return (
    <Select
      labelInValue
      showSearch
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : "Không tìm thấy"}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL} style={{ marginRight: 8 }}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  );
}
// Hàm tìm kiếm người dùng trong Firestore
async function fetchUserList(search, curMembers) {
  if (!search?.trim()) return []; // Nếu không có input hợp lệ, trả về danh sách rỗng

  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("keywords", "array-contains", search.toLowerCase()),
      orderBy("displayName"),
      limit(20)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => {
        const user = doc.data();
        return {
          label: user.displayName,
          value: user.uid,
          photoURL: user.photoURL || "",
        };
      })
      .filter((opt) => !curMembers.includes(opt.value)); // Loại bỏ thành viên đã có
  } catch (error) {
    console.error("Lỗi khi tìm kiếm người dùng:", error);
    return [];
  }
}

// Modal mời thành viên vào nhóm chat
export default function InviteMemberModal() {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = async () => {
    if (!selectedRoomId || !selectedRoom) {
      console.error("Lỗi: selectedRoomId hoặc selectedRoom không tồn tại!");
      return;
    }

    if (!value.length) {
      console.warn("Không có thành viên nào được chọn để thêm!");
      return;
    }

    try {
      // Lấy tham chiếu đến phòng chat
      const roomRef = doc(db, "rooms", selectedRoomId);

      // Cập nhật danh sách thành viên
      await updateDoc(roomRef, {
        members: arrayUnion(...value.map((val) => val.value)),
      });

      console.log("Cập nhật thành viên thành công!");

      // Reset form và đóng modal
      form.resetFields();
      setValue([]);
      setIsInviteMemberVisible(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật danh sách thành viên:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };

  return (
    <Modal
      title="Mời thêm thành viên"
      open={isInviteMemberVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          name="search-user"
          label="Tên các thành viên"
          value={value}
          placeholder="Nhập tên thành viên"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: "100%" }}
          curMembers={selectedRoom.members}
        />
      </Form>
    </Modal>
  );
}
