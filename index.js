const fs = require("fs")
const nfile = fs.readFileSync("code.n", "utf-8")
let asm = "global _start\n_start:\n"

const tokens = []

let ctoken = ""

//tokenize
for (let i = 0; i < nfile.length; i++) {
    const c = nfile.charAt(i)

    //letter
    if (/[a-zA-Z0-9]/.test(c)) {
        ctoken += c
    } else if (c === ";") {
        if (ctoken !== "") {
            tokens.push(ctoken)
            ctoken = ""
        }
        tokens.push(";")

    } else { //no letter/number
        if (ctoken !== "") {
            tokens.push(ctoken)
            ctoken = ""
        }
    }
    console.log(c)
}

//last token/char
if (ctoken !== "") {
    tokens.push(ctoken)
    ctoken = ""
}

console.log(tokens)

//tokens to commands 
const commands = []
let currentCmd = []
tokens.forEach(token => {
    if (token !== ";") {
        currentCmd.push(token)
    } else {
        commands.push(currentCmd)
        currentCmd = []
    }
})

for (let i = 0; i < commands.length; i++) {
    if (commands[i][0] = "return") {
        if (/^[0-9]*$/.test(commands[i][1])) {
            asm += "   mov rax, 60\n"
            asm += "   mov rdi, " + commands[i][1] + "\n"
            asm += "   syscall"
        } else {
            console.error("Compile error> Wrong usage of return. Use return <exitcode>;")
        }
    }
}
fs.writeFileSync("test.asm", asm)
