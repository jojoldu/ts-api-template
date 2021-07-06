describe("query 파라미터 객체", () => {
    it("변수 뽑아낸뒤 실행", () => {
        const user_id = "1";
        const auth_code = "a";
        const values = { user_id, auth_code, type: "type" };
        const query = `INSERT INTO "mobile_auth_code"
                       VALUES (${values})`;

        console.log(query);
    });

    it("변수 뽑아내지 않고 실행", () => {
        const user_id = "1";
        const auth_code = "a";
        const query = `INSERT INTO "mobile_auth_code"
                       VALUES (${{ user_id, auth_code, type: "type" }})`;

        console.log(query);
    });
});
