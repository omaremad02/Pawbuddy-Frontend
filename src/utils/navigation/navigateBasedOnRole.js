import Swal from "sweetalert2";

export const navigateBasedOnRole = (user, navigate) => {

  if (user && user.role) {
    // Navigate based on the user's role
    switch (user.role) {
      case "Admin":
        navigate("/Admin");
        break;
      case "ShelterStaff":
        navigate("/shelterStaff");
        break;
      case "ShelterManager":
        navigate("/shelterManager");
        break;
      default:
        Swal.fire({
          title: "Unrecognized Role",
          text: "Your role does not match any valid paths. Please contact support.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/"); // Default route for unrecognized roles
        });
        break;
    }
  } else {
    // Handle error case: User or role is undefined
    Swal.fire({
      title: "Error",
      text: "Unable to determine your role. Please log in again.",
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/login"); // Redirect to login or error page
    });
  }

};
