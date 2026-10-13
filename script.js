 // Base exchange rates relative to USD (USD Base)
        const exchangeRates = {
            USD: 1.0,
            KHR: 4100.0,
            EUR: 0.92,
            THB: 36.5,
            CNY: 7.23,
            JPY: 155.0,
            GBP: 0.79,
            SGD: 1.35
        };

        const amountInput = document.getElementById('amount-input');
        const convertedInput = document.getElementById('converted-input');
        const fromCurrencySelect = document.getElementById('from-currency');
        const toCurrencySelect = document.getElementById('to-currency');
        const swapBtn = document.getElementById('swap-btn');
        const rateIndicator = document.getElementById('rate-indicator');
        const clockText = document.getElementById('clock-text');
        const dateText = document.getElementById('date-text');

        // View elements
        const rateView = document.getElementById('rate-view');
        const converterView = document.getElementById('converter-view');

        // Tabs functionality
        const rateTab = document.getElementById('rate-tab');
        const converterTab = document.getElementById('converter-tab');

        rateTab.addEventListener('click', () => {
            rateTab.classList.add('active');
            converterTab.classList.remove('active');
            rateView.classList.add('active');
            converterView.classList.remove('active');
        });

        converterTab.addEventListener('click', () => {
            converterTab.classList.add('active');
            rateTab.classList.remove('active');
            converterView.classList.add('active');
            rateView.classList.remove('active');
        });

        // Live Clock & Date matching system date
        function updateDateTime() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const formattedTime = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
            clockText.textContent = formattedTime;

            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
            const dayOfWeek = daysOfWeek[now.getDay()];
            
            dateText.textContent = `${day}.${month}.${year} ${dayOfWeek}`;
        }

        setInterval(updateDateTime, 1000);
        updateDateTime();

        // Currency Conversion Calculation Logic
        function convertCurrency() {
            const amount = parseFloat(amountInput.value);
            const fromCurr = fromCurrencySelect.value;
            const toCurr = toCurrencySelect.value;

            if (isNaN(amount) || amount < 0) {
                convertedInput.value = "0.00";
                return;
            }

            const amountInUSD = amount / exchangeRates[fromCurr];
            const convertedAmount = amountInUSD * exchangeRates[toCurr];

            convertedInput.value = convertedAmount.toFixed(2);

            const oneUnitInUSD = 1 / exchangeRates[fromCurr];
            const unitRate = oneUnitInUSD * exchangeRates[toCurr];
            let formattedRate = unitRate < 0.01 ? unitRate.toFixed(6) : unitRate.toFixed(2);
            rateIndicator.textContent = `1 ${fromCurr} = ${formattedRate} ${toCurr}`;
        }

        amountInput.addEventListener('input', convertCurrency);
        fromCurrencySelect.addEventListener('change', convertCurrency);
        toCurrencySelect.addEventListener('change', convertCurrency);

        swapBtn.addEventListener('click', () => {
            const tempCurr = fromCurrencySelect.value;
            fromCurrencySelect.value = toCurrencySelect.value;
            toCurrencySelect.value = tempCurr;

            amountInput.value = convertedInput.value;
            convertCurrency();
        });

        convertCurrency();