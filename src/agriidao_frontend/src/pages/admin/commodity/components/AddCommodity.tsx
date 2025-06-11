import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { CommodityRequest } from "../../../../../../declarations/commodity/commodity.did";
import { z } from "zod";
import { useForm } from "react-hook-form";
// import { uploadFile } from "../../../hooks/storage/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCommodityRequest } from "../../../../redux/slices/app";

type Props = {
    showAddCommodityModal: boolean;
    setShowAddCommodityModal: (showAddCommodityModal: boolean) => void;
};

type FormData = {
    name: string;
    ticker: string;
    commodityPic: string;
    acCategory: string;
};

const AddCommodity: React.FC<Props> = ({
    showAddCommodityModal,
    setShowAddCommodityModal,
}) => {

    const { commodityActor, settingsActor, identity } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<any[] | null>(null);
    const [commodityPic, setCommodityPic] = useState<File | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    let typeName = "Commodity";

    const schema = z.object({
        name: z
            .string()
            .min(3, { message: "Name must be 3 or more characters long" })
            .max(40, { message: "Name must be less than 40 characters long" }),
        ticker: z
            .string()
            .min(3, { message: "Ticker must be 3 or more characters long" })
            .max(5, { message: "Ticker must be less than 5 characters long" }),
        acCategory: z.string().min(1, { message: "Category required" }),
    });

   
    useEffect(() => {
        getTypeCategories();
    }, []);

    const getTypeCategories = async () => {
        try {
            const res = await settingsActor?.getAllCategoriesByType(
                typeName
            );
            setCategories(res || null);
        } catch (error) {
            console.log("Error when fetching categories", error);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const handleSave = async (data: FormData) => {
        if (!identity || !commodityActor) {
            console.error("Identity or commodityActor is null");
            return;
        }

        // let commodityPicUrl = "";
        // if (commodityPic) {
        //     try {
        //         commodityPicUrl = URL.createObjectURL(commodityPic);
        //     } catch (error) {
        //         console.error("Error uploading file:", error);
        //         toast.error("Error uploading file");
        //         setSaving(false);
        //         return;
        //     }
        // }

        try {
            let commodity: CommodityRequest = {
                name: data.name,
                ticker: data.ticker,
                commodityPic: "commodityPicUrl",
                acCategoryId: data.acCategory,
            };
            dispatch(setCommodityRequest(commodity));
            setCurrentStep(2);
        } catch (error) {
            console.error("Error adding commodity:", error);
            toast.error("Error adding commodity");
        }
        // setSaving(false);
    };