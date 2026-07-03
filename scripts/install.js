const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const pkgPath = path.join(__dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const mirror = process.env.MONGO_BINARY_HOST;

if (!pkg.binary) {
    pkg.binary = {};
}

if (mirror) {
    console.log("[mongodb-client-encryption] Using binary mirror:", mirror);
    pkg.binary.host = mirror;
} else {
    pkg.binary.host = undefined;
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

execSync("prebuild-install --runtime napi || node-gyp rebuild", {
    stdio: "inherit",
});