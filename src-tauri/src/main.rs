#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::fs;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct Person {
    name: String,
    age: u8,
    phones: Vec<String>,
}
#[tauri::command]
fn load(path: String) -> String {
    let s = match fs::read_to_string(path) {
        Ok(v) => v,
        Err(e) => e.to_string(),
    };
    s
}
#[tauri::command]
fn write(path: String, txt: String) -> Result<(), ()> {
    fs::write(path, txt);
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load, write])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
