import { FC, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectProjections } from "../../../../../../declarations/projects/projects.did";
import { Modal } from "react-bootstrap";
import { toastError, toastSuccess } from "../../../../utils/Utils";

type Props = {
  showRoyaltyModal: boolean;
  setShowRoyaltyeModal: (showRoyaltyModal: boolean) => void;
};

type FormData = {
  royaltyPercentage: number;
};

const DRoyalty: FC<Props> = ({ showRoyaltyModal, setShowRoyaltyeModal }) => {
  const { projectsActor, identity } = useAuth();
  const { id } = useParams();
  const [saving, setSaving] = useState(false);

  const schema = z.object({
    royaltyPercentage: z
      .number()
      .min(1, { message: "Royalty Percentage required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleSave = async (data: FormData) => {
    if (!identity || !projectsActor) {
      console.error("Identity or projectsActor is null");
      return;
    }
    setSaving(true);
    if (!id) {
      console.error("Project ID is undefined");
      return;
    }
    const projections = await projectsActor.getProjectProjectionsByProjectId(id);
    console.log("Projections", projections);
    const body: ProjectProjections = {
      ...projections,
      royaltyPercentage: BigInt(data.royaltyPercentage),
      royaltySplit: (BigInt(data.royaltyPercentage) * BigInt(projections.profit)) / BigInt(100)
    };
    console.log("Updating royalty split", body);
    try {
      const res = await projectsActor.updateProjectProjections(body);
      console.log("Royalty split updated", res);
      if (res && "ok" in res) {
        setShowRoyaltyeModal(false);
        toastSuccess("Royalty split updated successfully");
      } else {
        throw new Error("Failed to update royalty split");
      }
    } catch (error) {
      setSaving(false);
      toastError("Error updating royalty");
      console.error("Error updating royalty", error);
    }
  };

  return (
    <Modal
      show={showRoyaltyModal}
      onHide={() => setShowRoyaltyeModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Royalty Split</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="input-style no-borders input-required">
            <input
              placeholder="What % of surplus(profit) do you want to share with backers?"
              type="number"
              className="textinput textInput form-control"
              {...register("royaltyPercentage", { valueAsNumber: true })}
            />
            {errors.royaltyPercentage && (
              <span className="text-danger">
                {errors.royaltyPercentage.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DRoyalty;
