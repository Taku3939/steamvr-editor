#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::fs;

use serde::{Deserialize, Serialize};

mod models;

#[derive(Serialize, Deserialize, Debug)]
struct Person {
    name: String,
    age: u8,
    phones: Vec<String>,
}
#[tauri::command]
fn load() -> String {
    let s = match fs::read_to_string("../default.vrsettings") {
        Ok(v) => v,
        Err(e) => e.to_string(),
    };
    s
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
