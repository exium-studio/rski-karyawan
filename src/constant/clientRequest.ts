import reqWithHeader from "./reqWithHeader";

const clientRequest = reqWithHeader.get("sanctum/csrf-cookie");

export default clientRequest;
