const GuideService = require("../services/guideService");
const GuideRepository = require("../repositories/guideRepository");

jest.mock("../repositories/guideRepository");

describe("GuideService", () => {
  test("create harus error kalau nama/link kosong", async () => {
    await expect(GuideService.create("", "link.com")).rejects.toThrow("Nama dan Link wajib diisi");
    await expect(GuideService.create("Nama", "")).rejects.toThrow("Nama dan Link wajib diisi");
  });

  test("create harus simpan guide", async () => {
    GuideRepository.create.mockResolvedValue({ id: 1, nama: "Test", link: "http://test.com" });

    const guide = await GuideService.create("Test", "http://test.com");
    expect(guide).toHaveProperty("nama", "Test");
    expect(GuideRepository.create).toHaveBeenCalled();
  });

  test("getById harus error kalau id kosong", async () => {
    await expect(GuideService.getById("")).rejects.toThrow("ID wajib diisi");
  });

  test("getAll harus memanggil repository", async () => {
    GuideRepository.getAll.mockResolvedValue([{ id: 1, nama: "Test" }]);
    const guides = await GuideService.getAll();
    expect(guides).toHaveLength(1);
    expect(GuideRepository.getAll).toHaveBeenCalled();
  });
});
