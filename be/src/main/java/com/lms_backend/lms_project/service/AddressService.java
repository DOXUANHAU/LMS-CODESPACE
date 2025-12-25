package com.lms_backend.lms_project.service;

import com.lms_backend.lms_project.entity.Address;

public interface AddressService {
    Address addAddress(Address address);

    Address updateAddress(Address address);

    Address getAddressById(int addressId);
}
