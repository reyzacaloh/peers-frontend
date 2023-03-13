import React from "react";

import Select from "react-select";
import { subjectOption } from "../docs/data";

const SearchBar = () => {
    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder="Ingin belajar apa hari ini?"
                name="subject"
                options={subjectOption}
            />
        </>
    );
};

export default SearchBar;