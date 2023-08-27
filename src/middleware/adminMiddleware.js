export const Rolecheck = (roles) => async (req, res, next) => {
    console.log("Roles allowed:", roles);
    console.log("User's role:", req.user.role);

    const check = roles.indexOf(req.user.role);
    console.log("Check:", check);

    if (check < 0) {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    } else {
        next();
    }
};
