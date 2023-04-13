import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import UploadButton from "../chat/UploadButton.jsx";

describe('UploadButton', () => {
    it('should add a file on file load', () => {
      render(<UploadButton />);
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const input = screen.getByTestId('file-browser-input');
      fireEvent.change(input, { target: { files: [file] } });
      expect(input).toBeInTheDocument();
    });
  
    it('should remove a file on click of remove button', () => {
      render(<UploadButton />);
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const input = screen.getByTestId('file-browser-input');
      fireEvent.change(input, { target: { files: [file] } });
      const img = screen.queryByTestId('image');
      expect(img).not.toBeInTheDocument();
    });
  
    it('should remove all files on click of Upload button', () => {
      render(<UploadButton />);
      const file1 = new File(['test'], 'test1.png', { type: 'image/png' });
      const file2 = new File(['test'], 'test2.png', { type: 'image/png' });
      const input = screen.getByTestId('file-browser-input');
      fireEvent.change(input, { target: { files: [file1, file2] } });
      const uploadBtn = screen.getByRole('button', { name: 'Upload' });
      fireEvent.click(uploadBtn);
      const img1 = screen.queryByRole('img', { name: 'test1.png' });
      const img2 = screen.queryByRole('img', { name: 'test2.png' });
      expect(img1).not.toBeInTheDocument();
      expect(img2).not.toBeInTheDocument();
    });
  });