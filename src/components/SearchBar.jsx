import React from "react";

import Select from "react-select";
import { subjectOption } from "../docs/data";

const SearchBar = ({onChange}) => {
    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder="Ingin belajar apa hari ini?"
                name="subject"
                options={subjectOption}
                onChange={onChange}
            />
        </>
    );
};

export default SearchBar;
