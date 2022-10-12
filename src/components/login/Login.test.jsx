import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Login from "./Login"

jest.mock("axios", () => ({
    __esModule: true,

    default: {
        get: () => ({
            data: { id: 1, name: "John" }
        })
    }
}))


test("username input should be rendered", () => {
    render(<Login />)
    const userInput = screen.getByPlaceholderText(/username/i)
    expect(userInput).toBeInTheDocument()
})

test("password input should be rendered", () => {
    render(<Login />)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument()
})

test("button should be rendered", () => {
    render(<Login />)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
})

test("username input should be Empty", () => {
    render(<Login />)
    const userInput = screen.getByPlaceholderText(/username/i)
    expect(userInput.value).toBe("")
})

test("password input should be Empty", () => {
    render(<Login />)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput.value).toBe("")
})

test("Button should be disable", () => {
    render(<Login />)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
})

test("error message should not be visible", () => {
    render(<Login />)
    const errorEl = screen.getByTestId("error")
    expect(errorEl).not.toBeVisible()
})

test("username input should change", () => {
    render(<Login />)
    const userInput = screen.getByPlaceholderText(/username/i)
    const testValue = "test"

    fireEvent.change(userInput, { target: { value: testValue } })
    expect(userInput.value).toBe(testValue)
})

test("password input should change", () => {
    render(<Login />)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const testValue = "test"

    fireEvent.change(passwordInput, { target: { value: testValue } })
    expect(passwordInput.value).toBe(testValue)
})

test("Button should not be disable on input", () => {
    render(<Login />)
    const button = screen.getByRole("button")
    const userInput = screen.getByPlaceholderText(/username/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const testValue = "test"

    fireEvent.change(userInput, { target: { value: testValue } })
    fireEvent.change(passwordInput, { target: { value: testValue } })
    expect(button).not.toBeDisabled()
})

test("Loading should no be renderer", () => {
    render(<Login />)
    const button = screen.getByRole("button")
    expect(button).not.toHaveTextContent(/please wait/i)
})

test("Loading should be rendered when click", () => {
    render(<Login />)
    const button = screen.getByRole("button")
    const userInput = screen.getByPlaceholderText(/username/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const testValue = "test"

    fireEvent.change(userInput, { target: { value: testValue } })
    fireEvent.change(passwordInput, { target: { value: testValue } })
    fireEvent.click(button)
    expect(button).toHaveTextContent(/please wait/i)
})

test("Loading should not be rendered after fetch", async () => {
    render(<Login />)
    const button = screen.getByRole("button")
    const userInput = screen.getByPlaceholderText(/username/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const testValue = "test"

    fireEvent.change(userInput, { target: { value: testValue } })
    fireEvent.change(passwordInput, { target: { value: testValue } })
    fireEvent.click(button)

    await waitFor(() =>
        expect(button).not.toHaveTextContent(/please wait/i)
    )
})

test("Should show John name from API", async () => {
    render(<Login />)
    const button = screen.getByRole("button")
    const userInput = screen.getByPlaceholderText(/username/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const testValue = "test"

    fireEvent.change(userInput, { target: { value: testValue } })
    fireEvent.change(passwordInput, { target: { value: testValue } })
    fireEvent.click(button)

    const userItem = await screen.findByText("John")
    expect(userItem).toHaveTextContent("John")

})