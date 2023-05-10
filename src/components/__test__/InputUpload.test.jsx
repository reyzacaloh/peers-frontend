import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import AuthContextProvider from "../../contexts/AuthContext";
import Input from "../chat/Input";
import {BrowserRouter} from "react-router-dom";


describe('InputUpload test', () => {

  const renderInput = () => (
    render(<AuthContextProvider> <Input /> </AuthContextProvider>, {wrapper: BrowserRouter})
  );
  let uploadField;
  let testFile;

  beforeEach(() => {
    renderInput();
    uploadField = screen.getByTestId("input");
    testFile = new File(["(⌐□_□)"], "chucknorris.jpg", { type: "image/jpg" });
  });

  test.skip('State test', async () => {
    await waitFor(() =>
      fireEvent.change(uploadField, {
        target: {files: [testFile]},
      })
    );
    expect(uploadField.files[0].name).toBe(testFile.name);
  });
});