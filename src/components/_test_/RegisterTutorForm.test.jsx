import { render, screen, act, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event'
import RegisterTutorForm from '../registerTutorForm/RegisterTutorForm';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom'

describe('RegisterForm test', () => {
  let emailField;
  let nameField;
  let npmField;
  let identity;
  let file;
  let registerButton;
  beforeEach(() => {
    file = new File(["test"], "test.jpg", { type: "image/jpg" });
    render(<RegisterTutorForm />,{wrapper: BrowserRouter});
    emailField = screen.getByTestId("email");
    nameField = screen.getByTestId("name");
    npmField = screen.getByTestId("npm");
    identity = screen.getByTestId("identity");
    registerButton = screen.getByText('Register');
  });

  test('all field in form fully renders', () => {
      expect(emailField).toBeInTheDocument();
      expect(nameField).toBeInTheDocument();
      expect(npmField).toBeInTheDocument();
      expect(identity).toBeInTheDocument();
    });

  test('when backend API calls succesful', async () => {
      jest.mock('axios');
      axios.post = jest.fn();
      const logSpy = jest.spyOn(global.console,'log')
      const expectedResponse = {
          'success': true,
          'statusCode': '201 Created',
          'message': 'User successfully registered!',
          'userEvent': {
            'email': 'test@gmail.com',
            'name': 'tester',
            'npm': '2028062005',
          },
      }
      axios.post.mockResolvedValueOnce(expectedResponse);
      act(() => {
        userEvent.type(emailField, 'test@gmail.com')
        userEvent.type(nameField, 'tester')
        userEvent.type(npmField, '2028062005')
        userEvent.upload(identity, file)
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
    const logSpy = jest.spyOn(global.console,'log')
    const expectedError = new Error("Network Error");
    axios.post.mockRejectedValueOnce(expectedError);
    act(()=> {
      userEvent.type(emailField, 'test@gmail.com')
      userEvent.type(nameField, 'tester')
      userEvent.type(npmField, '2028062005')
      userEvent.upload(identity, file)
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

  test('not call API when validation failed', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    userEvent.type(emailField, 'b')
    userEvent.type(nameField, '')
    userEvent.type(npmField, '28')
    userEvent.upload(identity, file)
    userEvent.click(registerButton);
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledTimes(0)
    );
  })
}
)