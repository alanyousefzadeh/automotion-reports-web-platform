import React from "react";
import AdminCard from "../../components/AdminCard/AdminCard";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";

//make API call to get reports for each garage based on the garageName from URL, use sample data for now
const tasks = [
    {
        id: 1,
        title: "Create User",
    },
    {
        id: 2,
        title: "Update User",
    },
    {
        id: 3,
        title: "Delete User",
    },
];

function AdminSelectPage() {
    return (
        <>
            <Navigation />
            <div className="cards d-flex justify-content-center">
            <p>Admin Selections</p>
                {
                    tasks.map((task) => (
                        <AdminCard
                            key={task.id}
                            title={task.title}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default AdminSelectPage;
