import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { Country } from "../../../../declarations/settings/settings.did";


interface CountryNameProps {
    id: string;
}

const CountryName: React.FC<CountryNameProps> = ({ id }) => {
    const [country, setCountry] = useState<Country | null>(null);
    const { settingsActor } = useAuth();

    // get latest country
    useEffect(() => {
        getCountryLatest();
    }, [id]);
    const getCountryLatest = async () => {
        if (!settingsActor) {
            console.error("settingsActor is null");
            return;
        }
        const res = await settingsActor.getCountryByCode(id);

        if ("ok" in res) {
            setCountry(res.ok);
        } else {
            console.log(res);
        }
    };
    return <div>{country && <span>{country.name}</span>}</div>;
};
export default CountryName;