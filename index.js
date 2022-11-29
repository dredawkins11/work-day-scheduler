let currentTime = dayjs()
$("#currentDay").text(currentTime.format("MMM DD, YYYY hh:mm"))

$(".time-block").each( (i, element) => {
    const currentBlock = $(element)
    const blockTime = dayjs(`${currentTime.year()}-${currentTime.month()}-${currentTime.date()}${$(element).data("time")}`)

    if (blockTime.hour() < currentTime.hour()) currentBlock.addClass("past")
    if (blockTime.hour() > currentTime.hour()) currentBlock.addClass("future")
    if (blockTime.hour() == currentTime.hour()) currentBlock.addClass("present")


    const currentTextArea = $(currentBlock.children()[1])
    const time = $(currentBlock.children()[0]).text()
    const savedData = JSON.parse(localStorage.getItem(time))
    if (savedData) {
        currentTextArea.text(savedData.text)
    }
})
// First get all saved time blocks for the day
// Populate timeblocks with saved data


// Add event listeners to save buttons to save data to local storage on click
$(".saveBtn").click( (e) => {
    const saveBtnElement = $(e.target)
    const textAreaElement = saveBtnElement.prev()
    const inputValue = textAreaElement.val()

    const timeBlockData = {
        time: dayjs(`${currentTime.year()}-${currentTime.month()}-${currentTime.date()}${saveBtnElement.parent().data("time")}`),
        index: saveBtnElement.parent().index(),
        text: inputValue
    }

    localStorage.setItem(saveBtnElement.prev().prev().text(), JSON.stringify(timeBlockData))
})
