const key = import.meta.env.VITE_SCANDIT_KEY;
ScanditSDK.configure(key, {
    engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
})
    .then(() => {
        return ScanditSDK.BarcodePicker.create(
            document.getElementById("barcode-picker"),
            {
                // enable some common symbologies
                scanSettings: new ScanditSDK.ScanSettings({
                    enabledSymbologies: [
                        "ean8",
                        "ean13",
                        "upca",
                        "upce",
                        "code128",
                        "code39",
                        "itf",
                        "qr",
                        "data-matrix",
                    ],
                    searchArea: {
                        x: 0,
                        y: 0.333,
                        width: 1,
                        height: 0.333,
                    },
                }),
            }
        );
    })
    .then((barcodePicker) => {
        // barcodePicker is ready here, show a message every time a barcode is scanned
        barcodePicker.on("scan", (scanResult) => {
            alert(scanResult.barcodes[0].data);
        });
        barcodePicker.on("scanError", (error) => {
            alert(`Scan error: ${error}`);
        });
    })
    .catch(function (error) {
        alert(error);
    });
