/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Firebase Admin SDK 초기화
admin.initializeApp();
const db = admin.firestore();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.getUserData = onRequest(async (request, response) => {
  // 쿼리 파라미터 또는 URL에서 userId를 가져옴
  const userId = request.query.userId;

  if (!userId) {
    response.status(400).send("userId가 필요합니다.");
    return;
  }

  try {
    // Firestore에서 users 컬렉션의 특정 문서 가져오기
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      response.status(404).send("해당 사용자가 존재하지 않습니다.");
    } else {
      response.status(200).send(userDoc.data());
    }
  } catch (error) {
    console.error("Error reading user document:", error);
    response.status(500).send("서버 에러가 발생했습니다.");
  }
});

exports.getRequests = onRequest(async (req, res) => {
  const userId = req.query.userId; // 예시: 'carejoa'

  try {
    // 특정 사용자의 orders 하위 컬렉션을 참조합니다.
    const ordersRef = db
      .collection("document")
      .doc(userId)
      .collection("request");

    // 하위 컬렉션 내 모든 문서를 가져옵니다.
    const ordersSnapshot = await ordersRef.get();

    if (ordersSnapshot.empty) {
      res.status(404).send("No orders found for this user.");
      return;
    }

    // 모든 문서 데이터를 배열로 저장
    let orders = [];
    ordersSnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    // 클라이언트에 데이터를 반환합니다.
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Error fetching orders");
  }
});
