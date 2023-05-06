import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event'
import RegisterTutorForm from '../registerTutorForm/RegisterTutorForm';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom'
import CustomSelect from '../registerTutorForm/CustomSelect';
import AuthContextProvider from '../../contexts/AuthContext';

describe('RegisterForm test', () => {
  let subjectField;
  let universityField;
  let pddiktiField;
  let ktp;
  let ktm_person;
  let transkrip;
  let file;
  let pdfile;
  let registerButton;

  beforeEach(() => {
    file = new File(["test"], "test.jpg", { type: "image/jpg" });
    pdfile = new File(["pdtest"], "pdtest.pdf", { type: "file/pdf" });
    render(<AuthContextProvider>
      <RegisterTutorForm />
    </AuthContextProvider>
      , { wrapper: BrowserRouter });
    subjectField = screen.getByText('Select a subject');
    universityField = screen.getByTestId("university");
    pddiktiField = screen.getByTestId("pddikti");
    ktp = screen.getByTestId("ktp");
    ktm_person = screen.getByTestId("ktm_person");
    transkrip = screen.getByTestId("transkrip");
    registerButton = screen.getByText('Register');
  });

  test('all field in form fully renders', () => {
    expect(subjectField).toBeInTheDocument();
    expect(universityField).toBeInTheDocument();
    expect(pddiktiField).toBeInTheDocument();
    expect(ktp).toBeInTheDocument();
    expect(ktm_person).toBeInTheDocument();
    expect(transkrip).toBeInTheDocument();
  });

  test('when backend API calls successful', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    const logSpy = jest.spyOn(global.console, 'log')
    const expectedResponse = {
      'success': true,
      'statusCode': '201 Created',
      'message': 'User successfully registered!',
      'userEvent': {
        'subject': 'matematika',
        'university': 'UI',
        'pddikti': 'https://pddikti.kemdikbud.go.id/data_mahasiswa/Rjc2QjdDRDMtNUY5Ny00NjM5LUJCMkItMDc3ODZGMjkxMTVF',
      },
    }
    axios.post.mockResolvedValueOnce(expectedResponse);

    act(() => {
      userEvent.type(universityField, 'UI')
      userEvent.type(pddiktiField, 'https://pddikti.kemdikbud.go.id/data_mahasiswa/Rjc2QjdDRDMtNUY5Ny00NjM5LUJCMkItMDc3ODZGMjkxMTVF')
      userEvent.upload(ktp, file)
      userEvent.upload(ktm_person, file)
      userEvent.upload(transkrip, pdfile)
      userEvent.click(registerButton);
    });
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalled()
    );
    expect(logSpy).toHaveBeenCalledWith(expectedResponse);
    logSpy.mockRestore();
  })

  test('when backend API calls unsuccesful', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    const logSpy = jest.spyOn(global.console, 'log')
    const expectedError = new Error("Network Error");
    axios.post.mockRejectedValueOnce(expectedError);

    act(() => {
      userEvent.type(subjectField, 'Matematika')
      userEvent.type(universityField, 'UI')
      userEvent.type(pddiktiField, 'https://pddikti.kemdikbud.go.id/data_mahasiswa/Rjc2QjdDRDMtNUY5Ny00NjM5LUJCMkItMDc3ODZGMjkxMTVF')
      userEvent.upload(ktp, file)
      userEvent.upload(ktm_person, file)
      userEvent.upload(transkrip, pdfile)
      userEvent.click(registerButton);
    })
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalled()
    );
    expect(logSpy).toHaveBeenCalledWith("Error: ", expectedError);
    logSpy.mockRestore();
  })

  test('not call API when fields are empty', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    userEvent.click(registerButton);
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledTimes(0)
    );
  })

  test('should call onChange when the first option is selected', async () => {
    const mockedOptions = [
      { label: 'Mocked option 1', value: 'mocked-option-1' },
      { label: 'Mocked option 2', value: 'mocked-option-2' },
      { label: 'Mocked option 3', value: 'mocked-option-3' },
    ]
    const mockedOnChange = jest.fn();
    const { getByText, queryByTestId, findByText } = render(<CustomSelect
      className="test"
      options={mockedOptions}
      onChange={mockedOnChange} />);
    const mySelectComponent = queryByTestId('test');

    expect(mySelectComponent).toBeDefined();
    expect(mySelectComponent).not.toBeNull();
    expect(mockedOnChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
    await findByText('Mocked option 1');
    fireEvent.click(getByText('Mocked option 1'));

    expect(mockedOnChange).toHaveBeenCalledTimes(1);
    expect(mockedOnChange).toHaveBeenCalledWith({ label: 'Mocked option 1', value: 'mocked-option-1' });

  });

  test('not call API when validation failed', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    const expectedResponse = {
      'success': true,
      'statusCode': '201 Created',
      'message': 'User successfully registered!',
      'userEvent': {
        'subject': 'matematika',
        'university': 'UI',
        'pddikti': 'https://pddikti.kemdikbud.go.id/data_mahasiswa/Rjc2QjdDRDMtNUY5Ny00NjM5LUJCMkItMDc3ODZGMjkxMTVF',
      },
    }
    axios.post.mockResolvedValueOnce(expectedResponse);
    act(() => {
      userEvent.type(universityField, 'b')
      userEvent.type(pddiktiField, 'kosong')
      userEvent.upload(ktp, file)
      userEvent.upload(ktm_person, file)
      userEvent.upload(transkrip, pdfile)
      userEvent.click(registerButton);
    })
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledTimes(0)
    );
  })
}
)