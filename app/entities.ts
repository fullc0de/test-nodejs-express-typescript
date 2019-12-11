import { injectable, inject } from "inversify"
import "reflect-metadata"
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces"
import { TYPES } from "./types"

@injectable()
class Katana implements Weapon {
    public hit(): string {
        return "cut!"
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    public throw(): string {
        return "hit!"
    }
}

@injectable()
class Ninja implements Warrior {

    private katana: Weapon
    private shuriken: ThrowableWeapon

    constructor(@inject(TYPES.Weapon) katana: Weapon,
                @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon) {
        this.katana = katana
        this.shuriken = shuriken
    }

    public fight(): string {
        return this.katana.hit()
    }

    public sneak(): string {
        return this.shuriken.throw()
    }
}

export { Ninja, Katana, Shuriken }
