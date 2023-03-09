import React from "react";
import { render, screen } from "@testing-library/react";
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    test('renders search bar correctly', () => {
        render(<SearchBar />);
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });
});