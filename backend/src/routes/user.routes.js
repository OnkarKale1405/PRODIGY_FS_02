import { Router } from "express";
import {
    loginUser,
    logoutUser,
    verifyEmail,
    registerUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    forgotPasswordRequest,
    resetForgottenPassword,
    resendEmailVerification,
    updateAccountDetails,
} from "../controllers/user.controller.js";
import {
    updateUserAvatar,
} from "../controllers/userFiles.controller.js";

// middlewares
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    registerUser
);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/user").get(verifyJWT, getCurrentUser);
router.route("/update-details").patch(verifyJWT, updateAccountDetails);
router.route("/update-avatar")
    .patch(
        verifyJWT,
        upload.single("avatar"),
        updateUserAvatar
    );

router.route("/verify-email/:verificationToken").get(verifyEmail);

router
    .route("/forgot-password")
    .post(forgotPasswordRequest);
router
    .route("/reset-password/:resetToken")
    .post(
        resetForgottenPassword
    );
router
    .route("/resend-email-verification")
    .post(verifyJWT, resendEmailVerification);

export default router