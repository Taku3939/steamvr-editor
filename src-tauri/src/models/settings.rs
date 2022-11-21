use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Driver {
    driver_null: DriverInfo,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DriverInfo {
    enable: bool,
    loadPriority: i64,
    serialNumber: String,
    modelNumber: String,
    windowX: i64,
    windowY: i64,
    windowWidth: i64,
    windowHeight: i64,
    renderWidth: i64,
    renderHeight: i64,
    secondsFromVsyncToPhotons: f64,
    displayFrequency: f64,
}
