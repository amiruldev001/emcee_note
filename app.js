function calculate() {
    let price = parseFloat(document.getElementById("price").value);
    let dpPercent = parseFloat(document.getElementById("dp").value);
    let rate = parseFloat(document.getElementById("rate").value) / 100;
    let years = parseInt(document.getElementById("years").value);

    let type = document.querySelector('input[name="interestType"]:checked').value;

    if (!price || !dpPercent || !rate) {
        alert("Isi semua maklumat");
        return;
    }

    let dp = price * (dpPercent / 100);
    let loan = price - dp;
    let months = years * 12;

    let monthly, total, interest;

    if (type === "reducing") {
        let monthlyRate = rate / 12;

        monthly = loan * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

        total = monthly * months;
        interest = total - loan;

        generateScheduleReducing(loan, monthly, monthlyRate, months);

    } else {
        // FLAT RATE
        interest = loan * rate * years;
        total = loan + interest;
        monthly = total / months;

        generateScheduleFlat(loan, monthly, interest, months);
    }

    document.getElementById("result").innerHTML = `
        Loan: RM ${loan.toFixed(2)}<br>
        Monthly: RM ${monthly.toFixed(2)}<br>
        Total: RM ${total.toFixed(2)}<br>
        Interest: RM ${interest.toFixed(2)}
    `;
}