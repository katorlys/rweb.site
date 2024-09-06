'use strict'

let records = []

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#footerYear").textContent = new Date().getFullYear().toString()
    
    fetch("../../records.json")
        .then(response => response.json())
        .then(data => {
            records = [...Object.keys(data.cname), ...data.reserved]
        })
        .catch((error) => {
            console.error("Error:", error)
        })

    document.querySelector("input[name='subdomain']").addEventListener("input", function () {
        if (this.value === "") {
            document.querySelector("button[type='submit']").disabled = true
            return
        }
        
        /* Check user's input for naming a subdomain */
        // Allow `a-z`, `0-9`
        this.value = this.value.replace(/[^a-z0-9-]/g, "")
        // Allow `-` but not as a starting or ending character
        if (this.value.startsWith('-')) this.value = this.value.substring(1)
        if (this.value.endsWith('-')) this.value = this.value.slice(0, -1)
        
        /* Check whether the subdomain name already exists */
        if (records.length > 0) {
            document.querySelector("button[type='submit']").disabled = this.value.trim() === "" || this.value === "-" || this.value.length < 2 || records.includes(this.value)
        } else {
            document.querySelector("button[type='submit']").disabled = this.value.trim() === "" || this.value === "-" || this.value.length < 2
        }
    })

    document.querySelector("button[type='submit']").addEventListener("click", function (event) {
        event.preventDefault()
        window.location = "https://github.com/katorlys/rweb.site#how-to-get-one"
    })

    document.addEventListener("keydown", function (event) {
        if (event.key === "/") {
            event.preventDefault()
            document.querySelector("input[name='subdomain']").focus()
        } else if (event.key === "Enter") {
            document.querySelector("button[type='submit']").click()
        }
    })
})
