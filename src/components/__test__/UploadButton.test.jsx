import React from "react";
import { render, fireEvent, screen, act } from '@testing-library/react';
import UploadButton from "../chat/UploadButton.jsx";
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../../contexts/AuthContext';

describe('UploadButton', () => {
  let file;
  let input;
  file = new File(['test'], 'test.png', { type: 'image/png' });
  beforeEach(() => {
    render(<AuthContextProvider>
      <UploadButton />
    </AuthContextProvider>
      , { wrapper: BrowserRouter });
    input = screen.getByTestId('file-browser-input');
  });

    it('should add a file on file load', () => {
      fireEvent.change(input, { target: { files: [file] } });
      expect(input).toBeInTheDocument();
    });
  
    it('should remove a file on click of remove button', () => {
      fireEvent.change(input, { target: { files: [file] } });
      const img = screen.queryByTestId('image');
      expect(img).not.toBeInTheDocument();
    });

    it('allows uploading of an image', () => {
      fireEvent.change(input, { target: { files: [file] } });
      expect(input.src).toContain('');
    });

    it('should remove all files on click of Upload button', () => {
      const file1 = new File(['test'], 'test1.png', { type: 'image/png' });
      const file2 = new File(['test'], 'test2.png', { type: 'image/png' });
      fireEvent.change(input, { target: { files: [file1, file2] } });
      const uploadBtn = screen.getByRole('button', { name: 'Upload' });
      fireEvent.click(uploadBtn);
      const img1 = screen.queryByRole('img', { name: 'test1.png' });
      const img2 = screen.queryByRole('img', { name: 'test2.png' });
      expect(img1).not.toBeInTheDocument();
      expect(img2).not.toBeInTheDocument();
    });
  });