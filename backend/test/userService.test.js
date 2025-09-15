const UserService = require("../services/userService");
const UserRepository = require("../repositories/userRepository");

// 🔹 Mock repository supaya tidak query DB beneran
jest.mock("../repositories/userRepository");

describe("UserService", () => {
  test("createUser harus hash password dan simpan user", async () => {
    // bikin dummy user
    UserRepository.createUser.mockResolvedValue({
      id: 1,
      username: "testuser",
      role: "user"
    });

    const user = await UserService.createUser("testuser", "password123");
    expect(user).toHaveProperty("username", "testuser");
    expect(UserRepository.createUser).toHaveBeenCalled();
  });

  test("findByUsername harus error kalau username kosong", async () => {
    await expect(UserService.findByUsername("")).rejects.toThrow("Username wajib diisi");
  });
});
