use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Score {
    username: String,
    score: u32,
}

async fn get_scores() -> impl Responder {
    let scores = vec![
        Score { username: "Alice".to_string(), score: 100 },
        Score { username: "Bob".to_string(), score: 90 },
    ];
    HttpResponse::Ok().json(scores)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/scores", web::get().to(get_scores))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

