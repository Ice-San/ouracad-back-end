export function splitNames(name: string) {
    const nameArray = name.split(" ");

    if (nameArray.length <= 1) {
        return { firstName: name, lastName: "" };
    }

    const firstName = nameArray[0];
    const lastName = nameArray.at(-1);

    return { firstName, lastName };
}