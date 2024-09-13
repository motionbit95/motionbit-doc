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

exports.getSubCollections = onRequest(async (req, res) => {
  try {
    // 1. 특정 컬렉션의 문서를 참조 (컬렉션 이름은 요청에서 가져오거나 하드코딩 가능)
    const collectionName = req.query.collection; // 요청 쿼리에서 컬렉션 이름 가져오기
    const docId = req.query.doc; // 요청 쿼리에서 문서 ID 가져오기

    // 2. 문서 참조 생성
    const docRef = db.collection(collectionName).doc(docId);

    // 3. 하위 컬렉션 목록 가져오기
    const subCollections = await docRef.listCollections();

    // 4. 하위 컬렉션 이름만 배열로 변환
    const subCollectionNames = subCollections.map((col) => col.id);

    // 5. 결과 응답
    res.status(200).json({
      success: true,
      subCollections: subCollectionNames,
    });
  } catch (error) {
    console.error("Error getting subcollections:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get subcollections",
      error: error.message,
    });
  }
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

exports.getDocuments = onRequest(async (req, res) => {
  const userId = req.query.userId; // 예시: 'carejoa'
  const subCollection = req.query.subCollection; // 예시: 'request'

  try {
    // 특정 사용자의 orders 하위 컬렉션을 참조합니다.
    const ordersRef = db
      .collection("document")
      .doc(userId)
      .collection(subCollection);

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

exports.saveDocument = onRequest(async (req, res) => {
  const userId = req.query.userId; // 예시: 'carejoa'
  const subCollection = req.query.subCollection; // 예시: 'request'
  const documentData = req.body; // 요청 본문에서 저장할 데이터 받기

  try {
    // 특정 사용자의 하위 컬렉션 참조
    const subCollectionRef = db
      .collection("document")
      .doc(userId)
      .collection(subCollection);

    // 새 문서를 추가합니다.
    const docRef = await subCollectionRef.add(documentData);

    // 성공적으로 문서가 저장되었음을 응답
    res
      .status(200)
      .send({ id: docRef.id, message: "Document successfully saved." });
  } catch (error) {
    console.error("Error saving document:", error);
    res.status(500).send("Error saving document");
  }
});

exports.updateDocument = onRequest(async (req, res) => {
  // 업데이트할 문서의 경로
  const mainDocument = req.query.mainDocument; // 상위 문서
  const subCollection = req.query.subCollection; // 하위 컬렉션
  const id = req.query.id; // 하위 문서

  console.log("mainDocument: ", mainDocument);
  console.log("subCollection: ", subCollection);
  console.log("id: ", id);

  const docRef = db
    .collection("document")
    .doc(mainDocument)
    .collection(subCollection)
    .doc(id);

  // 업데이트할 데이터
  const updateData = req.body;

  console.log("updateData: ", updateData);

  try {
    // 문서 업데이트
    await docRef.update(updateData);
    res.status(200).send(updateData);
  } catch (error) {
    console.error("문서 업데이트 중 오류 발생: ", error);
    res.status(500).send("문서 업데이트 중 오류 발생.");
  }
});
