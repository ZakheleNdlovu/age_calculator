// Get DOM elements
        const birthdateInput = document.getElementById('birthdate');
        const calculateButton = document.getElementById('calculate-btn');
        const resultElement = document.getElementById('result');
        const resultValue = document.getElementById('result-value');
        const yearsElement = document.getElementById('years');
        const monthsElement = document.getElementById('months');
        const daysElement = document.getElementById('days');

        // Set maximum date to today
        const today = new Date();
        const maxDate = today.toISOString().split('T')[0];
        birthdateInput.max = maxDate;

        // Calculate age function
        function calculateAge() {
            const birthdate = new Date(birthdateInput.value);

            if (isNaN(birthdate.getTime())) {
                alert("Please enter a valid date of birth");
                return;
            }

            // Calculate difference
            const ageDetails = getAgeDetails(birthdate, today);

            // Display result
            resultValue.textContent = `${ageDetails.years} years`;
            yearsElement.textContent = ageDetails.years;
            monthsElement.textContent = ageDetails.months;
            daysElement.textContent = ageDetails.days;

            // Show result
            resultElement.style.display = 'block';

            // Animate result
            animateValue(0, ageDetails.years, 1000, yearsElement);
            animateValue(0, ageDetails.months, 1000, monthsElement);
            animateValue(0, ageDetails.days, 1000, daysElement);
        }

        // Calculate age details
        function getAgeDetails(birthdate, currentDate) {
            let years = currentDate.getFullYear() - birthdate.getFullYear();
            let months = currentDate.getMonth() - birthdate.getMonth();
            let days = currentDate.getDate() - birthdate.getDate();

            // Adjust for negative months or days
            if (days < 0) {
                months--;
                // Get the number of days in the previous month
                const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                days += lastMonth.getDate();
            }

            if (months < 0) {
                years--;
                months += 12;
            }

            return {
                years: years,
                months: months,
                days: days
            };
        }

        // Animate value counting up
        function animateValue(start, end, duration, element) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Event listeners
        calculateButton.addEventListener('click', calculateAge);

        // Add some example dates for easier testing
        window.addEventListener('load', function () {
            // Set a default date (30 years ago)
            const defaultDate = new Date();
            defaultDate.setFullYear(defaultDate.getFullYear() - 30);
            defaultDate.setDate(defaultDate.getDate() + 5);
            birthdateInput.value = defaultDate.toISOString().split('T')[0];

            // Calculate age automatically on load
            calculateAge();
        });