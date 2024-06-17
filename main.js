const amountinput = document.querySelector(".Loan-amount");
const interestinput = document.querySelector(".interest-rate");
const timeinput = document.querySelector(".Loan_time");

const loanEMI = document.querySelector(".loan-EMI .value");
const TotalInterest = document.querySelector(".Total-Interest .value");
const Totalamount = document.querySelector(".Total-Amount .value");

const calculatebutton = document.querySelector(".calculate-btn");
const bankSelect = document.getElementById("bank-select");

let myChart;

const displayChart = (totalInterestPayable) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Total Interest", "Principal Loan Amount"],
            datasets: [
                {
                    data: [totalInterestPayable, parseFloat(amountinput.value)],
                    backgroundColor: ["#e63946", "#14213d"],
                    borderWidth: 0,
                },
            ],
        },
    });
};

const updateChart = (totalInterestPayable) => {
    myChart.data.datasets[0].data[0] = totalInterestPayable;
    myChart.data.datasets[0].data[1] = parseFloat(amountinput.value);
    myChart.update();
};

const calculateEMI = (amount, interestRate, time) => {
    let monthlyInterestRate = interestRate / 12 / 100;
    let emi = amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, time) / (Math.pow(1 + monthlyInterestRate, time) - 1);
    return emi;
};

const updateData = (emi) => {
    loanEMI.innerHTML = Math.round(emi);
    let totalAmount = Math.round(timeinput.value * emi);
    Totalamount.innerHTML = totalAmount;
    let interestPayable = Math.round(totalAmount - parseFloat(amountinput.value));
    TotalInterest.innerHTML = interestPayable;
    if (myChart) {
        updateChart(interestPayable);
    } else {
        displayChart(interestPayable);
    }
};

const updateValues = () => {
    let amount = parseFloat(amountinput.value);
    let interestRate = parseFloat(interestinput.value);
    let time = parseFloat(timeinput.value);

    let emi = calculateEMI(amount, interestRate, time);
    updateData(emi);
};

const init = () => {
    bankSelect.addEventListener('change', function () {
        let selectedBank = this.value;
        let interestRate;

        switch (selectedBank) {
            case "Sbi":
                interestRate = 8.73;
                break;
            case "bob":
                interestRate = 9.69;
                break;
            case "hdfc":
                interestRate = 11;
                break;
            case "icic":
                interestRate = 10;
                break;
            case "axis":
                interestRate = 13;
                break;
            case "kotak":
                interestRate = 12;
                break;
            case "indus":
                interestRate = 11.5;
                break;
            case "yes":
                interestRate = 10.5;
                break;
            case "punjab":
                interestRate = 10;
                break;
            case "bank_of_india":
                interestRate = 9.5;
                break;
            default:
                interestRate = parseFloat(interestinput.value);
        }

        interestinput.value = interestRate;
        updateValues();
    });

    calculatebutton.addEventListener("click", updateValues);

    // Initial calculation
    updateValues();
};

init();

function yesnoCheck(that) {
    if (that.value == "custom") {
        document.getElementById("ifYes").style.display = "block";
    } else {
        document.getElementById("ifYes").style.display = "none";
    }
}
