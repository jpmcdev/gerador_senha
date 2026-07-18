
        // Input Password
        const passwordGenerated = document.querySelector("#passwordGenerated");
        // Range Password
        const passwordLenght = document.querySelector("#passwordLenght");
        // Button Copy Password
        const btnCopyPassword = document.querySelector('#btnCopyPassword');
        // Button Regenerated Password
        const btnResetPassword = document.querySelector('.btnResetConf');
        // View Value Range
        const viewValueRange = document.querySelector('.valueRange');
        // Bar Value Range
        const barValueRange = document.querySelector(".barPasswordValue");
        // Count Range Default
        let valueRangePassword = 6;
        // Label Title Nivel da Senha
        const labelLenght = document.querySelector(".labelLenght");
        // Label time estimativ
        const labelCardDescription = document.querySelector(".labelCardDescription");
        // Checkbox Adjust Password
        const chkSymbol = document.querySelector(".passwordSymbol");
        const chkUppercase = document.querySelector(".passwordUppercase");
        const chkNumber = document.querySelector(".passwordNumber");
        // Values Types Caracter Passwords
        const textLowercase = "abcdefghjlmnpqrstuvwxyz"
        const textUppercase = "ABCDEFGHJLMNPQRSTUVWXYZ";
        const textNumber = "123456789";
        const textSymbol = "?!@#&*()[]";

        // -------------FUNCTION-------------------------

        // Function Generated Password
        const generatedPassword = () => {

            // Model Default Caracter
            let chars = textLowercase;

            // Verifica se os Checkbo estão marcados
            chkUppercase.checked ? chars += textUppercase : chars;

            chkNumber.checked ? chars += textNumber : chars;

            chkSymbol.checked ? chars += textSymbol : chars;

            let password = "";

            for (let c = 0; c < valueRangePassword; c++) {
                const randomPassword = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomPassword, randomPassword + 1);
            }

            passwordGenerated.value = password;

            calcQuality();
        }

        //  Calculation Qualit
        function calcQuality() {

            const percent = Math.round((valueRangePassword / 128) * 25 +
                (chkSymbol.checked ? 35 : 0) + (chkNumber.checked ? 25 : 0) +
                (chkUppercase.checked ? 25 : 0)
            );

            barValueRange.style.width = `${percent}%`;

            console.log(percent);

            if (percent <= 10) {
                passwordGenerated.classList.add("inputPass-xs");
                passwordGenerated.classList.remove("inputPass-lg");
                passwordGenerated.classList.remove("inputPass-md");
                passwordGenerated.classList.remove("inputPass-sm");
                labelLenght.innerHTML = "Fraca";
                labelLenght.style.color = "#ED465B";
                labelCardDescription.innerHTML = "Instantânea";
            } else if (percent <= 30) {
                passwordGenerated.classList.remove("inputPass-xs");
                passwordGenerated.classList.add("inputPass-lg");
                passwordGenerated.classList.remove("inputPass-md");
                passwordGenerated.classList.remove("inputPass-sm");
                labelLenght.innerHTML = "Razoável";
                labelLenght.style.color = "#FB7F48";
                labelCardDescription.innerHTML = "Alguns minutos";
            } else if (percent <= 50) {
                passwordGenerated.classList.remove("inputPass-xs");
                passwordGenerated.classList.remove("inputPass-lg");
                passwordGenerated.classList.add("inputPass-md");
                passwordGenerated.classList.remove("inputPass-sm");
                labelLenght.innerHTML = "Média";
                labelLenght.style.color = "#F3C650";
                labelCardDescription.innerHTML = "Alguns dias";
            } else if (percent <= 70) {
                passwordGenerated.classList.remove("inputPass-xs");
                passwordGenerated.classList.remove("inputPass-lg");
                passwordGenerated.classList.add("inputPass-md");
                passwordGenerated.classList.remove("inputPass-sm");
                labelLenght.innerHTML = "Forte";
                labelLenght.style.color = "#5EE198";
                labelCardDescription.innerHTML = "Alguns anos";
            } else if (percent <= 90) {
                passwordGenerated.classList.remove("inputPass-xs");
                passwordGenerated.classList.remove("inputPass-lg");
                passwordGenerated.classList.remove("inputPass-md");
                passwordGenerated.classList.add("inputPass-sm");
                labelLenght.innerHTML = "Muito Forte";
                labelLenght.style.color = "#4C8AD8";
                labelCardDescription.innerHTML = "Milhares de anos";
            } else {
                passwordGenerated.classList.remove("inputPass-xs");
                passwordGenerated.classList.remove("inputPass-lg");
                passwordGenerated.classList.remove("inputPass-md");
                passwordGenerated.classList.add("inputPass-sm");
                labelLenght.innerHTML = "Inquebrável";
                labelLenght.style.color = "#896CC4";
                labelCardDescription.innerHTML = "Milhões de anos";
            }
        }


        // Function Event Change Range
        passwordLenght.addEventListener("input", () => {

            valueRangePassword = passwordLenght.value;

            valorRange = Number(passwordLenght.value);

            viewValueRange.innerHTML = valorRange;

            generatedPassword();
        })

        // Function Event Click Checkbox
        chkUppercase.addEventListener("click", generatedPassword);
        chkNumber.addEventListener("click", generatedPassword);
        chkSymbol.addEventListener("click", generatedPassword);

        // Event Click Copy Password
        btnCopyPassword.addEventListener("click", () => {
            navigator.clipboard.writeText(passwordGenerated.value);

            tagCopy = '<span class="tagCopy">Senha Copiada!</span>';

            document.querySelector(".cardInfo").innerHTML = tagCopy;

            setTimeout(() => {
                document.querySelector(".cardInfo").innerHTML = "";
            }, 2000)
        });

        // Button Regenerated Passsword
        btnResetPassword.addEventListener("click", generatedPassword)

        // Exec Function Generated Password
        generatedPassword();