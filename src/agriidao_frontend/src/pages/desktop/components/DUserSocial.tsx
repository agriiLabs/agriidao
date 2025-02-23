import { FC, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserSocialMediaRequest,
} from "../../../../../declarations/bounty/bounty.did";
import { useDispatch } from "react-redux";
import { setUserSocialMediaRequest } from "../../../redux/slices/app";
import { AcCategory } from "../../../../../declarations/settings/settings.did";
import { Modal } from "react-bootstrap";
import DUserSocialPreview from "./DUserSocialPreview";

type Props = {
  showUserSocialModal: boolean;
  setShowUserSocialModal: (showUserSocialModal: boolean) => void;
};

type FormData = {
  userName: string;
};

const DUserSocial: FC<Props> = ({
  showUserSocialModal,
  setShowUserSocialModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { settingsActor, identity, temporaryVal } = useAuth();
  const [socialMedia, setSocialMedia] = useState<AcCategory | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    getSocialMedia();
  }, [temporaryVal]);

  const getSocialMedia = async () => {
    if (!settingsActor) {
      console.error("settingsActor is null");
      return;
    }
    try {
      const res = await settingsActor.getAcCategoryLatest(temporaryVal || "");
      if ("ok" in res) {
        setSocialMedia(res.ok);
      } else {
        console.error("Error getting social media name: ", res.err);
      }
    } catch (error) {
      console.error("Error getting social media name: ", error);
    }
  };

  let socialName = socialMedia?.name;

  const schema = z.object({
    userName: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" })
      .max(40, { message: "Name must be less than 40 chararcters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  let userId = identity?.getPrincipal();

  const handleSave = async (data: FormData) => {
    if (!temporaryVal) {
      console.error("social media id not available");
      return;
    }

    if (!userId) {
      throw new Error(
        "User ID is undefined. Please make sure the user is logged in."
      );
    }

    let body: UserSocialMediaRequest = {
      userId: userId,
      userName: data.userName,
      socialMediaId: temporaryVal,
    };
    dispatch(setUserSocialMediaRequest(body));
    setCurrentStep(2);
  };

  return (
    <Modal
      show={showUserSocialModal}
      onHide={() => setShowUserSocialModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Social Media Username</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStep === 1 ? (
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="input-style no-borders input-required">
              <input
                placeholder="What is your username?"
                type="text"
                {...register("userName")}
                className="textinput textInput form-control"
              />
              {errors.userName && (
                <span style={{ color: "red" }}>{errors.userName.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
            >
              Next
            </button>
          </form>
        ) : (
          <DUserSocialPreview setCurrentStep={setCurrentStep} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DUserSocial;
