import { serialize, Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class Employee {
    @JsonProperty()
    public isSuperviser: boolean;

    @JsonProperty({
        name: "fullname"
    })
    public name: string;

    @JsonProperty()
    public superviser?: Employee;

    public constructor() {
        this.isSuperviser = false;
        this.name = "";
        this.superviser = undefined;
    }
}

describe("test typescript-json-serializer", () => {

    it("basic functionality", () => {

        let superv = new Employee();
        superv.isSuperviser = true;
        superv.name = "heath";
        superv.superviser = undefined;

        let data = serialize(superv);
        expect(data.isSuperviser).toBe(true);
        expect(data.fullname).toBe("heath");
        expect(data.superviser).toBe(undefined);

        let emp = new Employee();
        emp.isSuperviser = false;
        emp.name = "andrew";
        emp.superviser = superv;

        data = serialize(emp);
//        console.log(`data = ${JSON.stringify(data)}`);
        expect(data.isSuperviser).toBe(false);
        expect(data.fullname).toBe("andrew");
        expect(data.superviser.isSuperviser).toBe(true);
        expect(data.superviser.fullname).toBe("heath");
    });
});