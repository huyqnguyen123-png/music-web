/* AUTH PAGE LOGIC  */
document.addEventListener('DOMContentLoaded', () => {
    console.log("Auth JS Loaded - Strict Mode");

    /* TOAST NOTIFICATION */
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        toast.innerHTML = `<i class="fas ${iconClass}"></i><span class="toast-msg">${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
        toast.addEventListener('click', () => toast.remove());
    }

    /* DOM ELEMENTS */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const highlighter = document.getElementById('tab-highlighter');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    const countryInput = document.getElementById('app-search-field'); 
    const countryList = document.getElementById('country-list');
    const dropdownContainer = document.querySelector('.custom-dropdown');

    const passInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirm-password');
    const errorMsg = document.getElementById('pass-error-msg'); 

    /* LOGIC VALIDATION FORM */
    function clearErrorOnInput(inputElement) {
        inputElement.addEventListener('input', () => {
            if(inputElement.value.trim() !== '') {
                inputElement.classList.remove('input-error');
            }
        });
    }

    if (registerForm) {
        const requiredInputs = registerForm.querySelectorAll('input[required]');
        requiredInputs.forEach(input => clearErrorOnInput(input));
    }

    function checkPasswordMatch() {
        if (!passInput || !confirmInput) return true;
        
        const pass = passInput.value;
        const confirm = confirmInput.value;

        if (confirm.length > 0) {
            if (pass !== confirm) {
                confirmInput.classList.add('input-error');
                if (errorMsg) errorMsg.style.display = 'block';
                return false;
            } else {
                confirmInput.classList.remove('input-error');
                if (errorMsg) errorMsg.style.display = 'none';
                return true;
            }
        } else {
            confirmInput.classList.remove('input-error');
            if (errorMsg) errorMsg.style.display = 'none';
            return false;
        }
    }

    if (passInput && confirmInput) {
        confirmInput.addEventListener('input', checkPasswordMatch);
        passInput.addEventListener('input', checkPasswordMatch); 
    }

    /* REGISTER SUBMIT HANDLER */
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputs = registerForm.querySelectorAll('input[required]');
            let isAnyEmpty = false;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('input-error');
                    isAnyEmpty = true;
                } else {
                    if (input.id !== 'reg-confirm-password') {
                        input.classList.remove('input-error');
                    }
                }
            });

            if (isAnyEmpty) {
                showToast("Please fill in all highlighted fields!", "error");
                return; 
            }

            const password = passInput.value;
            const confirmPass = confirmInput.value;

            if (password !== confirmPass) {
                confirmInput.classList.add('input-error');
                if (errorMsg) errorMsg.style.display = 'block';
                showToast("Passwords do not match!", "error");
                return;
            }

            if (password.length < 6) {
                passInput.classList.add('input-error');
                showToast("Password must be at least 6 characters.", "error");
                return;
            }

            const firstName = document.getElementById('reg-firstname').value.trim();
            const lastName = document.getElementById('reg-lastname').value.trim();
            const phone = document.getElementById('reg-phone').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const country = document.getElementById('app-search-field').value;

            const btn = registerForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Processing...";
            btn.style.opacity = "0.7";
            btn.disabled = true;

            try {
                const newUser = { id: Date.now(), firstName, lastName, country, phone, email, password };
                const res = await MockBackend.register(newUser);
                
                showToast(`Success! ${res.message}`, "success");
                
                setTimeout(() => {
                    document.querySelector('[data-target="login-form"]').click();
                    document.getElementById('login-email').value = email;
                    registerForm.reset();
                    inputs.forEach(i => i.classList.remove('input-error'));
                    if (errorMsg) errorMsg.style.display = 'none';
                }, 1500);

            } catch (err) {
                showToast(err, "error");
                if (err.includes("Email")) {
                    document.getElementById('reg-email').classList.add('input-error');
                }
            } finally {
                btn.innerText = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
            }
        });
    }

    /* SLIDING TAB, LOGIN, COUNTRY... */
    function moveHighlighter(targetBtn) {
        if (!highlighter || !targetBtn) return;
        const width = targetBtn.offsetWidth;
        const left = targetBtn.offsetLeft;
        highlighter.style.width = `${width}px`;
        highlighter.style.transform = `translateX(${left}px)`;
    }
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn && highlighter) {
        moveHighlighter(activeBtn);
        setTimeout(() => { highlighter.style.opacity = '1'; }, 100);
    }
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moveHighlighter(btn);
            tabBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => {
                f.classList.remove('active');
                f.classList.remove('fade-in');
            });
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetForm = document.getElementById(targetId);
            if (targetForm) {
                targetForm.classList.add('active');
                void targetForm.offsetWidth; 
                targetForm.classList.add('fade-in');
            }
        });
    });

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text'; 
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                input.type = 'password'; 
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const btn = loginForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Checking...";
            btn.style.opacity = "0.7";
            btn.disabled = true;
            try {
                const res = await MockBackend.login(email, password);
                showToast(`Welcome back, ${res.user.firstName}!`, "success");
                setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            } catch (err) {
                showToast("Incorrect email or password!", "error");
            } finally {
                btn.innerText = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
            }
        });
    }

    // Country Logic
    function getIsoCodeFromEmoji(flagEmoji) {
        const codePoints = Array.from(flagEmoji).map(c => c.codePointAt() - 127397);
        return String.fromCodePoint(...codePoints).toLowerCase();
    }
    const countries = [
        { name: "Afghanistan", flag: "🇦🇫", code: "+93" },
        { name: "Albania", flag: "🇦🇱", code: "+355" },
        { name: "Algeria", flag: "🇩🇿", code: "+213" },
        { name: "American Samoa", flag: "🇦🇸", code: "+1-684" },
        { name: "Andorra", flag: "🇦🇩", code: "+376" },
        { name: "Angola", flag: "🇦🇴", code: "+244" },
        { name: "Anguilla", flag: "🇦🇮", code: "+1-264" },
        { name: "Antarctica", flag: "🇦🇶", code: "+672" },
        { name: "Antigua and Barbuda", flag: "🇦🇬", code: "+1-268" },
        { name: "Argentina", flag: "🇦🇷", code: "+54" },
        { name: "Armenia", flag: "🇦🇲", code: "+374" },
        { name: "Aruba", flag: "🇦🇼", code: "+297" },
        { name: "Australia", flag: "🇦🇺", code: "+61" },
        { name: "Austria", flag: "🇦🇹", code: "+43" },
        { name: "Azerbaijan", flag: "🇦🇿", code: "+994" },
        { name: "Bahamas", flag: "🇧🇸", code: "+1-242" },
        { name: "Bahrain", flag: "🇧🇭", code: "+973" },
        { name: "Bangladesh", flag: "🇧🇩", code: "+880" },
        { name: "Barbados", flag: "🇧🇧", code: "+1-246" },
        { name: "Belarus", flag: "🇧🇾", code: "+375" },
        { name: "Belgium", flag: "🇧🇪", code: "+32" },
        { name: "Belize", flag: "🇧🇿", code: "+501" },
        { name: "Benin", flag: "🇧🇯", code: "+229" },
        { name: "Bermuda", flag: "🇧🇲", code: "+1-441" },
        { name: "Bhutan", flag: "🇧🇹", code: "+975" },
        { name: "Bolivia", flag: "🇧🇴", code: "+591" },
        { name: "Bosnia and Herzegovina", flag: "🇧🇦", code: "+387" },
        { name: "Botswana", flag: "🇧🇼", code: "+267" },
        { name: "Brazil", flag: "🇧🇷", code: "+55" },
        { name: "British Indian Ocean Territory", flag: "🇮🇴", code: "+246" },
        { name: "British Virgin Islands", flag: "🇻🇬", code: "+1-284" },
        { name: "Brunei", flag: "🇧🇳", code: "+673" },
        { name: "Bulgaria", flag: "🇧🇬", code: "+359" },
        { name: "Burkina Faso", flag: "🇧🇫", code: "+226" },
        { name: "Burundi", flag: "🇧🇮", code: "+257" },
        { name: "Cambodia", flag: "🇰🇭", code: "+855" },
        { name: "Cameroon", flag: "🇨🇲", code: "+237" },
        { name: "Canada", flag: "🇨🇦", code: "+1" },
        { name: "Cape Verde", flag: "🇨🇻", code: "+238" },
        { name: "Cayman Islands", flag: "🇰🇾", code: "+1-345" },
        { name: "Central African Republic", flag: "🇨🇫", code: "+236" },
        { name: "Chad", flag: "🇹🇩", code: "+235" },
        { name: "Chile", flag: "🇨🇱", code: "+56" },
        { name: "China", flag: "🇨🇳", code: "+86" },
        { name: "Christmas Island", flag: "🇨🇽", code: "+61" },
        { name: "Cocos Islands", flag: "🇨🇨", code: "+61" },
        { name: "Colombia", flag: "🇨🇴", code: "+57" },
        { name: "Comoros", flag: "🇰🇲", code: "+269" },
        { name: "Cook Islands", flag: "🇨🇰", code: "+682" },
        { name: "Costa Rica", flag: "🇨🇷", code: "+506" },
        { name: "Croatia", flag: "🇭🇷", code: "+385" },
        { name: "Cuba", flag: "🇨🇺", code: "+53" },
        { name: "Curacao", flag: "🇨🇼", code: "+599" },
        { name: "Cyprus", flag: "🇨🇾", code: "+357" },
        { name: "Czech Republic", flag: "🇨🇿", code: "+420" },
        { name: "Democratic Republic of the Congo", flag: "🇨🇩", code: "+243" },
        { name: "Denmark", flag: "🇩🇰", code: "+45" },
        { name: "Djibouti", flag: "🇩🇯", code: "+253" },
        { name: "Dominica", flag: "🇩🇲", code: "+1-767" },
        { name: "Dominican Republic", flag: "🇩🇴", code: "+1-809" },
        { name: "East Timor", flag: "🇹🇱", code: "+670" },
        { name: "Ecuador", flag: "🇪🇨", code: "+593" },
        { name: "Egypt", flag: "🇪🇬", code: "+20" },
        { name: "El Salvador", flag: "🇸🇻", code: "+503" },
        { name: "Equatorial Guinea", flag: "🇬🇶", code: "+240" },
        { name: "Eritrea", flag: "🇪🇷", code: "+291" },
        { name: "Estonia", flag: "🇪🇪", code: "+372" },
        { name: "Ethiopia", flag: "🇪🇹", code: "+251" },
        { name: "Falkland Islands", flag: "🇫🇰", code: "+500" },
        { name: "Faroe Islands", flag: "🇫🇴", code: "+298" },
        { name: "Fiji", flag: "🇫🇯", code: "+679" },
        { name: "Finland", flag: "🇫🇮", code: "+358" },
        { name: "France", flag: "🇫🇷", code: "+33" },
        { name: "French Polynesia", flag: "🇵🇫", code: "+689" },
        { name: "Gabon", flag: "🇬🇦", code: "+241" },
        { name: "Gambia", flag: "🇬🇲", code: "+220" },
        { name: "Georgia", flag: "🇬🇪", code: "+995" },
        { name: "Germany", flag: "🇩🇪", code: "+49" },
        { name: "Ghana", flag: "🇬🇭", code: "+233" },
        { name: "Gibraltar", flag: "🇬🇮", code: "+350" },
        { name: "Greece", flag: "🇬🇷", code: "+30" },
        { name: "Greenland", flag: "🇬🇱", code: "+299" },
        { name: "Grenada", flag: "🇬🇩", code: "+1-473" },
        { name: "Guam", flag: "🇬🇺", code: "+1-671" },
        { name: "Guatemala", flag: "🇬🇹", code: "+502" },
        { name: "Guernsey", flag: "🇬🇬", code: "+44-1481" },
        { name: "Guinea", flag: "🇬🇳", code: "+224" },
        { name: "Guinea-Bissau", flag: "🇬🇼", code: "+245" },
        { name: "Guyana", flag: "🇬🇾", code: "+592" },
        { name: "Haiti", flag: "🇭🇹", code: "+509" },
        { name: "Honduras", flag: "🇭🇳", code: "+504" },
        { name: "Hong Kong", flag: "🇭🇰", code: "+852" },
        { name: "Hungary", flag: "🇭🇺", code: "+36" },
        { name: "Iceland", flag: "🇮🇸", code: "+354" },
        { name: "India", flag: "🇮🇳", code: "+91" },
        { name: "Indonesia", flag: "🇮🇩", code: "+62" },
        { name: "Iran", flag: "🇮🇷", code: "+98" },
        { name: "Iraq", flag: "🇮🇶", code: "+964" },
        { name: "Ireland", flag: "🇮🇪", code: "+353" },
        { name: "Isle of Man", flag: "🇮🇲", code: "+44-1624" },
        { name: "Israel", flag: "🇮🇱", code: "+972" },
        { name: "Italy", flag: "🇮🇹", code: "+39" },
        { name: "Ivory Coast", flag: "🇨🇮", code: "+225" },
        { name: "Jamaica", flag: "🇯🇲", code: "+1-876" },
        { name: "Japan", flag: "🇯🇵", code: "+81" },
        { name: "Jersey", flag: "🇯🇪", code: "+44-1534" },
        { name: "Jordan", flag: "🇯🇴", code: "+962" },
        { name: "Kazakhstan", flag: "🇰🇿", code: "+7" },
        { name: "Kenya", flag: "🇰🇪", code: "+254" },
        { name: "Kiribati", flag: "🇰🇮", code: "+686" },
        { name: "Kosovo", flag: "🇽🇰", code: "+383" },
        { name: "Kuwait", flag: "🇰🇼", code: "+965" },
        { name: "Kyrgyzstan", flag: "🇰🇬", code: "+996" },
        { name: "Laos", flag: "🇱🇦", code: "+856" },
        { name: "Latvia", flag: "🇱🇻", code: "+371" },
        { name: "Lebanon", flag: "🇱🇧", code: "+961" },
        { name: "Lesotho", flag: "🇱🇸", code: "+266" },
        { name: "Liberia", flag: "🇱🇷", code: "+231" },
        { name: "Libya", flag: "🇱🇾", code: "+218" },
        { name: "Liechtenstein", flag: "🇱🇮", code: "+423" },
        { name: "Lithuania", flag: "🇱🇹", code: "+370" },
        { name: "Luxembourg", flag: "🇱🇺", code: "+352" },
        { name: "Macau", flag: "🇲🇴", code: "+853" },
        { name: "Macedonia", flag: "🇲🇰", code: "+389" },
        { name: "Madagascar", flag: "🇲🇬", code: "+261" },
        { name: "Malawi", flag: "🇲🇼", code: "+265" },
        { name: "Malaysia", flag: "🇲🇾", code: "+60" },
        { name: "Maldives", flag: "🇲🇻", code: "+960" },
        { name: "Mali", flag: "🇲🇱", code: "+223" },
        { name: "Malta", flag: "🇲🇹", code: "+356" },
        { name: "Marshall Islands", flag: "🇲🇭", code: "+692" },
        { name: "Mauritania", flag: "🇲🇷", code: "+222" },
        { name: "Mauritius", flag: "🇲🇺", code: "+230" },
        { name: "Mayotte", flag: "🇾🇹", code: "+262" },
        { name: "Mexico", flag: "🇲🇽", code: "+52" },
        { name: "Micronesia", flag: "🇫🇲", code: "+691" },
        { name: "Moldova", flag: "🇲🇩", code: "+373" },
        { name: "Monaco", flag: "🇲🇨", code: "+377" },
        { name: "Mongolia", flag: "🇲🇳", code: "+976" },
        { name: "Montenegro", flag: "🇲🇪", code: "+382" },
        { name: "Montserrat", flag: "🇲🇸", code: "+1-664" },
        { name: "Morocco", flag: "🇲🇦", code: "+212" },
        { name: "Mozambique", flag: "🇲🇿", code: "+258" },
        { name: "Myanmar", flag: "🇲🇲", code: "+95" },
        { name: "Namibia", flag: "🇳🇦", code: "+264" },
        { name: "Nauru", flag: "🇳🇷", code: "+674" },
        { name: "Nepal", flag: "🇳🇵", code: "+977" },
        { name: "Netherlands", flag: "🇳🇱", code: "+31" },
        { name: "Netherlands Antilles", flag: "🇦🇳", code: "+599" },
        { name: "New Caledonia", flag: "🇳🇨", code: "+687" },
        { name: "New Zealand", flag: "🇳🇿", code: "+64" },
        { name: "Nicaragua", flag: "🇳🇮", code: "+505" },
        { name: "Niger", flag: "🇳🇪", code: "+227" },
        { name: "Nigeria", flag: "🇳🇬", code: "+234" },
        { name: "Niue", flag: "🇳🇺", code: "+683" },
        { name: "North Korea", flag: "🇰🇵", code: "+850" },
        { name: "Northern Mariana Islands", flag: "🇲🇵", code: "+1-670" },
        { name: "Norway", flag: "🇳🇴", code: "+47" },
        { name: "Oman", flag: "🇴🇲", code: "+968" },
        { name: "Pakistan", flag: "🇵🇰", code: "+92" },
        { name: "Palau", flag: "🇵🇼", code: "+680" },
        { name: "Palestine", flag: "🇵🇸", code: "+970" },
        { name: "Panama", flag: "🇵🇦", code: "+507" },
        { name: "Papua New Guinea", flag: "🇵🇬", code: "+675" },
        { name: "Paraguay", flag: "🇵🇾", code: "+595" },
        { name: "Peru", flag: "🇵🇪", code: "+51" },
        { name: "Philippines", flag: "🇵🇭", code: "+63" },
        { name: "Pitcairn", flag: "🇵🇳", code: "+64" },
        { name: "Poland", flag: "🇵🇱", code: "+48" },
        { name: "Portugal", flag: "🇵🇹", code: "+351" },
        { name: "Puerto Rico", flag: "🇵🇷", code: "+1-787" },
        { name: "Qatar", flag: "🇶🇦", code: "+974" },
        { name: "Republic of the Congo", flag: "🇨🇬", code: "+242" },
        { name: "Reunion", flag: "🇷🇪", code: "+262" },
        { name: "Romania", flag: "🇷🇴", code: "+40" },
        { name: "Russia", flag: "🇷🇺", code: "+7" },
        { name: "Rwanda", flag: "🇷🇼", code: "+250" },
        { name: "Saint Barthelemy", flag: "🇧🇱", code: "+590" },
        { name: "Saint Helena", flag: "🇸🇭", code: "+290" },
        { name: "Saint Kitts and Nevis", flag: "🇰🇳", code: "+1-869" },
        { name: "Saint Lucia", flag: "🇱🇨", code: "+1-758" },
        { name: "Saint Martin", flag: "🇲🇫", code: "+590" },
        { name: "Saint Pierre and Miquelon", flag: "🇵🇲", code: "+508" },
        { name: "Saint Vincent and the Grenadines", flag: "🇻🇨", code: "+1-784" },
        { name: "Samoa", flag: "🇼🇸", code: "+685" },
        { name: "San Marino", flag: "🇸🇲", code: "+378" },
        { name: "Sao Tome and Principe", flag: "🇸🇹", code: "+239" },
        { name: "Saudi Arabia", flag: "🇸🇦", code: "+966" },
        { name: "Senegal", flag: "🇸🇳", code: "+221" },
        { name: "Serbia", flag: "🇷🇸", code: "+381" },
        { name: "Seychelles", flag: "🇸🇨", code: "+248" },
        { name: "Sierra Leone", flag: "🇸🇱", code: "+232" },
        { name: "Singapore", flag: "🇸🇬", code: "+65" },
        { name: "Sint Maarten", flag: "🇸🇽", code: "+1-721" },
        { name: "Slovakia", flag: "🇸🇰", code: "+421" },
        { name: "Slovenia", flag: "🇸🇮", code: "+386" },
        { name: "Solomon Islands", flag: "🇸🇧", code: "+677" },
        { name: "Somalia", flag: "🇸🇴", code: "+252" },
        { name: "South Africa", flag: "🇿🇦", code: "+27" },
        { name: "South Korea", flag: "🇰🇷", code: "+82" },
        { name: "South Sudan", flag: "🇸🇸", code: "+211" },
        { name: "Spain", flag: "🇪🇸", code: "+34" },
        { name: "Sri Lanka", flag: "🇱🇰", code: "+94" },
        { name: "Sudan", flag: "🇸🇩", code: "+249" },
        { name: "Suriname", flag: "🇸🇷", code: "+597" },
        { name: "Svalbard and Jan Mayen", flag: "🇸🇯", code: "+47" },
        { name: "Swaziland", flag: "🇸🇿", code: "+268" },
        { name: "Sweden", flag: "🇸🇪", code: "+46" },
        { name: "Switzerland", flag: "🇨🇭", code: "+41" },
        { name: "Syria", flag: "🇸🇾", code: "+963" },
        { name: "Taiwan", flag: "🇹🇼", code: "+886" },
        { name: "Tajikistan", flag: "🇹🇯", code: "+992" },
        { name: "Tanzania", flag: "🇹🇿", code: "+255" },
        { name: "Thailand", flag: "🇹🇭", code: "+66" },
        { name: "Togo", flag: "🇹🇬", code: "+228" },
        { name: "Tokelau", flag: "🇹🇰", code: "+690" },
        { name: "Tonga", flag: "🇹🇴", code: "+676" },
        { name: "Trinidad and Tobago", flag: "🇹🇹", code: "+1-868" },
        { name: "Tunisia", flag: "🇹🇳", code: "+216" },
        { name: "Turkey", flag: "🇹🇷", code: "+90" },
        { name: "Turkmenistan", flag: "🇹🇲", code: "+993" },
        { name: "Turks and Caicos Islands", flag: "🇹🇨", code: "+1-649" },
        { name: "Tuvalu", flag: "🇹🇻", code: "+688" },
        { name: "U.S. Virgin Islands", flag: "🇻🇮", code: "+1-340" },
        { name: "Uganda", flag: "🇺🇬", code: "+256" },
        { name: "Ukraine", flag: "🇺🇦", code: "+380" },
        { name: "United Arab Emirates", flag: "🇦🇪", code: "+971" },
        { name: "United Kingdom", flag: "🇬🇧", code: "+44" },
        { name: "United States", flag: "🇺🇸", code: "+1" },
        { name: "Uruguay", flag: "🇺🇾", code: "+598" },
        { name: "Uzbekistan", flag: "🇺🇿", code: "+998" },
        { name: "Vanuatu", flag: "🇻🇺", code: "+678" },
        { name: "Vatican", flag: "🇻🇦", code: "+379" },
        { name: "Venezuela", flag: "🇻🇪", code: "+58" },
        { name: "Vietnam", flag: "🇻🇳", code: "+84" },
        { name: "Wallis and Futuna", flag: "🇼🇫", code: "+681" },
        { name: "Western Sahara", flag: "🇪🇭", code: "+212" },
        { name: "Yemen", flag: "🇾🇪", code: "+967" },
        { name: "Zambia", flag: "🇿🇲", code: "+260" },
        { name: "Zimbabwe", flag: "🇿🇼", code: "+263" }
    ];

    function renderCountries(filterText = "") {
        if (!countryList) return;
        countryList.innerHTML = ""; 
        const filtered = countries.filter(c => c.name.toLowerCase().includes(filterText.toLowerCase()));
        if (filtered.length === 0) {
            countryList.innerHTML = `<div class="dropdown-item" style="pointer-events:none; color:#999;">No country found</div>`;
            return;
        }
        filtered.forEach(country => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            let isoCode = 'vn'; 
            try { isoCode = getIsoCodeFromEmoji(country.flag); } catch (e) {}
            item.innerHTML = `<img src="https://flagcdn.com/w40/${isoCode}.png" srcset="https://flagcdn.com/w80/${isoCode}.png 2x" width="24" height="16" alt="${country.name}" class="flag-img"><span>${country.name}</span>`;
            item.addEventListener('click', () => {
                countryInput.value = country.name;
                if(document.getElementById('reg-phone')) {
                    document.getElementById('reg-phone').value = country.code + " ";
                    document.getElementById('reg-phone').focus(); 
                }
                closeDropdown();
            });
            countryList.appendChild(item);
        });
    }
    function openDropdown() {
        if(countryList) countryList.classList.add('show');
        if(dropdownContainer) dropdownContainer.classList.add('open');
    }
    function closeDropdown() {
        if(countryList) countryList.classList.remove('show');
        if(dropdownContainer) dropdownContainer.classList.remove('open');
    }
    if (countryInput) {
        countryInput.addEventListener('click', (e) => { e.stopPropagation(); renderCountries(); openDropdown(); });
        countryInput.addEventListener('input', (e) => { renderCountries(e.target.value); openDropdown(); });
        document.addEventListener('click', (e) => {
            if (dropdownContainer && !dropdownContainer.contains(e.target)) { closeDropdown(); }
        });
    }
});