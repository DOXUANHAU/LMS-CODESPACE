import React from "react";
import { Layout } from 'antd';
import HomepageBanner from "../../../../components/Banner/HomepageBanner";
import Stats from "../../components/Stats/Stats";
import CourseSection from "../../components/Courses/CourseSection";
import InstructorSection from "../../components/Instructor/InstructorSection";
// import HomepageBanner1 from "../../components/Banner/HomepageBanner1";


export default function HomeScreen() {
    return (
        <>
            <HomepageBanner />
            {/* <HomepageBanner1 /> */}
            <Stats />
            <Layout.Content className="course-list-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px' }}>
                <CourseSection />
                <InstructorSection />
            </Layout.Content>
            
        </>
    );
}
  