async function inputText(inputType, inputTitle, inputText, notifyText, fireFunction) {
    const { value: text } = await Swal.fire({
        input: inputType,
        inputLabel: inputTitle,
        inputPlaceholder: inputText,
        inputAttributes: {
          'aria-label': 'Viết tin nhắn của bạn tại đây'
        },
        showCancelButton: true
      })
      
      if (text) {
        fireFunction(text);
      }
}

export {inputText};