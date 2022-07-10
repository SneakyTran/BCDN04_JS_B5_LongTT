//todo Quản lý tuyển sinh
/**
 * ?Khối 1: input
 * areaBonus, subjectBonus, benchmark
 * mark1, mark2, mark3
 *
 * ?Khối 2: progress
 * *B1: Khai báo và lấy giá trị nhập từ form
 * *B2:
 * *Nếu mark1 == 0 || mark2 == 0 || mark3 == 0
 * => Rớt
 * *Ngược lại
 *      totalMark = mark1 + mark2 + mark3 + area + subject
 *      *Nếu totalMark >= benchmark
 *          => Đậu
 *      *Ngược lại
 *          => Rớt
 * *B3: Thông báo kết quả
 * ?Khối 3: output
 * totalMark
 *
 */
//area bonus
const BONUS_AREA_A = 2;
const BONUS_AREA_B = 1;
const BONUS_AREA_C = 0.5;

//subject bonus
const BONUS_SUBJECT_1 = 2.5;
const BONUS_SUBJECT_2 = 1.5;
const BONUS_SUBJECT_3 = 1;

/**
 * Author: Sneaky
 * Date Created: 10/07/2022
 * @param {String} area
 * @returns areaBonus
 */
function getAreaBonus(area) {
    switch (area) {
        case "A":
            return BONUS_AREA_A;

        case "B":
            return BONUS_AREA_B;

        case "C":
            return BONUS_AREA_C;

        default:
            return 0;
    }
}

/**
 * Author: Sneaky
 * Date Created: 10/07/2022
 * @param {String} subject
 * @returns subjectBonus
 */
function getSubjectBonus(subject) {
    switch (subject) {
        case "1":
            return BONUS_SUBJECT_1;

        case "2":
            return BONUS_SUBJECT_2;

        case "3":
            return BONUS_SUBJECT_3;

        default:
            return 0;
    }
}

/**
 * Author: Sneaky
 * Date Created: 10/07/2022
 * @param {Number} mark1
 * @param {Number} mark2
 * @param {Number} mark3
 * @returns
 */
function isPassedMin(mark1, mark2, mark3) {
    return mark1 > 0 && mark2 > 0 && mark3 > 0 ? 1 : 0;
}

/**
 * Author: Sneaky
 * Date Created: 10/07/2022
 * @param {Number} totalMark
 * @param {Number} benmark
 * @returns
 */
function isPassedBenmark(totalMark, benmark) {
    return totalMark >= benmark ? 1 : 0;
}

function calTotalMark() {
    var areaBonus = getAreaBonus(document.getElementById("selectArea").value);
    var subjectBonus = getSubjectBonus(
        document.getElementById("selectSubject").value
    );
    var mark1 = Number(document.getElementById("ipMark1").value);
    var mark2 = Number(document.getElementById("ipMark2").value);
    var mark3 = Number(document.getElementById("ipMark3").value);
    var benmark = Number(document.getElementById("ipBenmark").value);
    var totalMark = mark1 + mark2 + mark3 + areaBonus + subjectBonus;
    var txtResult = document.getElementById("txtTotalMark");
    if (!isPassedMin(mark1, mark2, mark3)) {
        txtResult.innerHTML = "Bạn đã rớt. Do có điểm bằng 0";
        txtResult.className = "bg-danger p-2 text-white";
    } else if (isPassedBenmark(totalMark, benmark)) {
        txtResult.className = "bg-success p-2 text-white";
        txtResult.innerHTML = "Bạn đã đậu. Tổng điểm: " + totalMark;
    } else {
        txtResult.className = "bg-danger p-2 text-white";
        txtResult.innerHTML = "Bạn đã rớt. Tổng điểm: " + totalMark;
    }
}
document.getElementById("btnShowResult").onclick = calTotalMark;

//todo Tính tiền điện
/**
 * ?Khối 1: input
 * fullName, amountKw
 *
 * ?Khối 2: progress
 * *B1: Khai báo biến và lấy giá trị nhập từ form
 * *B2:
 *      *Nếu amountKw >=0 && amountKw <= 50
 *          totalBill = amountKw * 500
 *      *Nếu amountKw <= 100
 *          totalBill = 50 * 500 + (amountKw - 50) * 650
 *      *Nếu amountKw <= 200
 *          totalBill = 50 * 500 + 50*650 + (amountKw - 100) * 850
 *      *Nếu amountKw <= 350
 *          totalBill = 50 * 500 + 50*650 + 100*850 + (amountKw - 200) * 1100
 *      *Ngược lại
 *          totalBill = 50 * 500 + 50*650 + 100*850 + 150*1100 + (amountKw - 350) * 1300
 * *B3: Thông báo kết quả
 * ?Khối 3: output
 * totalBill
 */
const FIRST_50_PRICE = 500;
const NEXT_50_PRICE = 650;
const NEXT_100_PRICE = 850;
const NEXT_150_PRICE = 1100;
const OVER_PRICE = 1300;

/**
 * Author: Sneaky
 * Date Created: 10/07/2022
 * @param {Number} amountKw
 * @returns totalBill
 */
function calElec(amountKw) {
    if (amountKw <= 0) {
        alert("Số điện không hợp lệ. Hãy nhập lại!!!");
    } else if (amountKw <= 50) {
        return amountKw * FIRST_50_PRICE;
    } else if (amountKw <= 100) {
        return 50 * FIRST_50_PRICE + (amountKw - 50) * NEXT_50_PRICE;
    } else if (amountKw <= 200) {
        return (
            50 * FIRST_50_PRICE +
            50 * NEXT_50_PRICE +
            (amountKw - 100) * NEXT_100_PRICE
        );
    } else if (amountKw <= 350) {
        return (
            50 * FIRST_50_PRICE +
            50 * NEXT_50_PRICE +
            100 * NEXT_100_PRICE +
            (amountKw - 200) * NEXT_150_PRICE
        );
    } else {
        return (
            50 * FIRST_50_PRICE +
            50 * NEXT_50_PRICE +
            100 * NEXT_100_PRICE +
            150 * NEXT_150_PRICE +
            (amountKw - 350) * OVER_PRICE
        );
    }
}

/**
 * Author: Sneaky
 * Date Created: 10/07/2022
 */
function showBill() {
    var fullName = document.getElementById("ipName").value;
    var amountKw = Number(document.getElementById("ipKw").value);
    var totalBill = calElec(amountKw);
    document.getElementById("txtTotalBill").innerHTML =
        "Họ và tên: " + fullName + " Tiền điện: " + totalBill.toLocaleString();
}
document.getElementById("btnCalElec").onclick = showBill;
