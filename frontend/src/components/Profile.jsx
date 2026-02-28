import React from "react";
import { useAuth } from "../Authentication/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container py-4">

      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">

        
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h4 className="fw-bold mb-0">Profile Information</h4>

            <div className="d-flex align-items-center gap-2">
              <input type="file" className="form-control form-control-sm" />
              <button className="btn btn-primary btn-sm px-3">
                Upload
              </button>
            </div>
          </div>

          <hr />

        
          <div className="row mt-4">

            <div className="col-md-6 mb-3">
              <label className="form-label text-muted">Name</label>
              <div className="fw-semibold">
                {user?.name || "N/A"}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label text-muted">Email</label>
              <div className="fw-semibold">
                {user?.email || "N/A"}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label text-muted">Role</label>
              <div className="fw-semibold">
                {user?.role || "User"}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;