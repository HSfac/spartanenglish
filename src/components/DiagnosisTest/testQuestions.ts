// 테스트 문제 데이터
type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

// 중학생용 테스트 문제
export const middleSchoolQuestions: Question[] = [
  // 기본 문법 및 어휘 문제
  {
    id: 1,
    question: "Tom likes apples. He eats one every day. What does Tom like?",
    options: ["Bananas", "Apples", "Oranges", "Pears"],
    answer: 1,
    explanation: "첫 번째 문장에서 'Tom likes apples.'라고 명시되어 있으므로 Tom이 좋아하는 것은 사과(Apples)입니다."
  },
  {
    id: 2,
    question: "She ____ to school yesterday.",
    options: ["go", "goes", "went", "going"],
    answer: 2,
    explanation: "과거 시제 문장입니다. 'yesterday'는 과거를 나타내는 시간 표현이므로 'go'의 과거형인 'went'가 정답입니다."
  },
  {
    id: 3,
    question: "They ____ happy to see their friends.",
    options: ["is", "am", "are", "be"],
    answer: 2,
    explanation: "주어가 'They'이므로 복수형 be동사인 'are'가 와야 합니다."
  },
  {
    id: 4,
    question: "____ do you go to school?",
    options: ["What", "When", "Why", "Where"],
    answer: 1,
    explanation: "질문이 학교에 '언제' 가느냐를 묻고 있으므로, 시간을 묻는 의문사 'When'이 정답입니다."
  },
  {
    id: 5,
    question: "The book is ____ the table.",
    options: ["in", "on", "at", "under"],
    answer: 1,
    explanation: "책이 테이블 '위에' 있다는 의미이므로 위치를 나타내는 전치사 'on'이 정답입니다."
  },
  // 추가 중학생 문제
  {
    id: 6,
    question: "John and Mary ____ watching TV now.",
    options: ["is", "are", "was", "were"],
    answer: 1,
    explanation: "주어가 'John and Mary'로 복수이므로, 현재진행형에서는 'are'를 사용합니다."
  },
  {
    id: 7,
    question: "I have ____ apple and two bananas.",
    options: ["a", "an", "the", "this"],
    answer: 1,
    explanation: "단수 가산명사 'apple' 앞에는 모음으로 시작하므로 부정관사 'an'을 사용합니다."
  },
  {
    id: 8,
    question: "Which word means 'not expensive'?",
    options: ["cheap", "small", "fast", "good"],
    answer: 0,
    explanation: "'cheap'은 '저렴한, 비싸지 않은'이라는 뜻으로 'not expensive'와 같은 의미입니다."
  },
  {
    id: 9,
    question: "My brother ____ soccer every weekend.",
    options: ["play", "plays", "playing", "to play"],
    answer: 1,
    explanation: "주어가 3인칭 단수 'My brother'이고 현재 시제이므로, 동사 'play'에 -s를 붙여 'plays'가 됩니다."
  },
  {
    id: 10,
    question: "I ____ my homework yesterday, so I can play today.",
    options: ["finish", "finishes", "finished", "finishing"],
    answer: 2,
    explanation: "'yesterday'는 과거 시제를 나타내므로, 'finish'의 과거형인 'finished'가 정답입니다."
  },
  // 간단한 독해 문제
  {
    id: 11,
    question: "Sarah: How was your weekend?\nMike: It was great. I went to the beach with my family.\nWhat did Mike do on the weekend?",
    options: ["He stayed at home", "He went to the beach", "He visited his friends", "He went to school"],
    answer: 1,
    explanation: "Mike는 'I went to the beach with my family'라고 말했으므로, 주말에 가족과 함께 해변에 갔습니다."
  },
  {
    id: 12,
    question: "The classroom is big and bright. There are 25 students in the class. They are studying English now.\n\nHow many students are in the class?",
    options: ["15", "20", "25", "30"],
    answer: 2,
    explanation: "본문에 'There are 25 students in the class.'라고 명시되어 있습니다."
  },
  // 신규 추가 문제 - 중학교 수준
  {
    id: 13,
    question: "Choose the correct sentence:",
    options: [
      "She don't like pizza.",
      "She doesn't likes pizza.",
      "She doesn't like pizza.",
      "She not like pizza."
    ],
    answer: 2,
    explanation: "3인칭 단수 현재형 부정문에서는 'doesn't + 동사원형'을 사용합니다. 따라서 'She doesn't like pizza.'가 맞습니다."
  },
  {
    id: 14,
    question: "I want ____ a doctor in the future.",
    options: ["become", "to become", "becoming", "becomes"],
    answer: 1,
    explanation: "'want' 뒤에는 부정사(to + 동사원형)가 와야 합니다. 따라서 'to become'이 정답입니다."
  },
  {
    id: 15,
    question: "Read the passage:\n\nMy family has a dog. His name is Max. He is brown and white. Max likes to play in the garden. He also likes to sleep on the sofa.\n\nWhat color is Max?",
    options: ["Black", "White", "Brown and white", "Black and white"],
    answer: 2,
    explanation: "지문에서 'He is brown and white'라고 언급되어 있으므로 Max는 갈색과 흰색입니다."
  },
  {
    id: 16,
    question: "Which of the following is the past tense of 'buy'?",
    options: ["buys", "buyed", "buying", "bought"],
    answer: 3,
    explanation: "'buy'의 과거형은 불규칙 동사로 'bought'입니다."
  },
  {
    id: 17,
    question: "What is the opposite of 'big'?",
    options: ["large", "huge", "small", "heavy"],
    answer: 2,
    explanation: "'big(큰)'의 반대말은 'small(작은)'입니다."
  },
  {
    id: 18,
    question: "The students ____ their homework before the teacher came.",
    options: ["finish", "finishes", "had finished", "have finished"],
    answer: 2,
    explanation: "과거 시점(교사가 오기 전) 이전에 일어난 일이므로 과거완료 시제 'had finished'가 정답입니다."
  },
  {
    id: 19,
    question: "I have ____ apples than you.",
    options: ["much", "many", "more", "most"],
    answer: 2,
    explanation: "비교급을 만들 때 가산명사 'apples'와 함께 'more'를 사용합니다."
  },
  {
    id: 20,
    question: "She speaks English ____ than I do.",
    options: ["good", "well", "better", "best"],
    answer: 2,
    explanation: "'well'의 비교급은 'better'입니다. 따라서 'better than'이 정답입니다."
  }
];

// 고등학생용 테스트 문제
export const highSchoolQuestions: Question[] = [
  // 독해 및 분석 문제
  {
    id: 1,
    question: "Reading books helps people to expand their knowledge, improve their vocabulary, and develop critical thinking skills. What is the main idea of this passage?",
    options: [
      "Books are expensive.",
      "Reading is beneficial for intellectual development.",
      "Critical thinking is important.",
      "Knowledge comes from reading."
    ],
    answer: 1,
    explanation: "지문에서는 독서가 지식 확장, 어휘력 향상, 비판적 사고 발달에 도움이 된다고 설명하고 있습니다. 이를 종합하면 '독서가 지적 발달에 유익하다'는 것이 주제입니다."
  },
  // 복잡한 문법 문제
  {
    id: 2,
    question: "Never ____ I seen such a beautiful sunset.",
    options: ["have", "has", "had", "having"],
    answer: 0,
    explanation: "부정어 'Never'가 문장 앞에 위치하면 도치 구문이 됩니다. 주어가 'I'이고 현재완료시제이므로 'have'가 정답입니다."
  },
  {
    id: 3,
    question: "The girl ____ we met yesterday is my cousin.",
    options: ["who", "whom", "whose", "which"],
    answer: 0,
    explanation: "관계대명사 자리에서 'The girl'을 수식하며 'we met'의 목적어 역할을 하므로 'who'가 정답입니다."
  },
  {
    id: 4,
    question: "He was very tired; ____, he kept working until midnight.",
    options: ["therefore", "however", "moreover", "otherwise"],
    answer: 1,
    explanation: "앞문장(피곤했다)과 뒷문장(계속 일했다)이 역접 관계이므로 'however(그러나)'가 정답입니다."
  },
  {
    id: 5,
    question: "Which sentence contains a grammatical error?",
    options: [
      "She goes to school every day.",
      "I have been studying English for five years.",
      "They doesn't like pizza.",
      "He has finished his homework."
    ],
    answer: 2,
    explanation: "'They'는 복수 주어이므로 'doesn't'가 아닌 'don't'를 써야 합니다. 'They don't like pizza.'가 올바른 표현입니다."
  },
  // 추가 고등학생 문제
  {
    id: 6,
    question: "If I ____ the answer, I would tell you.",
    options: ["know", "knows", "knew", "known"],
    answer: 2,
    explanation: "가정법 과거 구문으로, 'If + 과거형 ~, would + 동사원형'의 형태를 취합니다. 따라서 'know'의 과거형인 'knew'가 정답입니다."
  },
  {
    id: 7,
    question: "By the time we arrived at the theater, the movie ____ already.",
    options: ["begins", "began", "has begun", "had begun"],
    answer: 3,
    explanation: "과거의 특정 시점(우리가 도착했을 때) 이전에 일어난 일이므로 과거완료시제인 'had begun'이 정답입니다."
  },
  {
    id: 8,
    question: "The report, along with its recommendations, ____ to be submitted by tomorrow.",
    options: ["need", "needs", "needing", "needed"],
    answer: 1,
    explanation: "주어는 'The report'이고 'along with its recommendations'는 부가어구이므로, 주어 'The report'에 맞게 단수형 동사 'needs'를 사용해야 합니다."
  },
  {
    id: 9,
    question: "Read the passage:\n\nGlobal warming refers to the long-term rise in Earth's average surface temperature due to human activities, primarily the burning of fossil fuels. These activities release greenhouse gases, which trap heat in the atmosphere. The consequences include melting ice caps, rising sea levels, and extreme weather events.\n\nWhat is the main cause of global warming according to the passage?",
    options: [
      "Natural climate cycles",
      "Human activities like burning fossil fuels",
      "Extreme weather events",
      "Rising sea levels"
    ],
    answer: 1,
    explanation: "지문에서 'due to human activities, primarily the burning of fossil fuels'라고 명시하고 있으므로, 인간 활동 특히 화석 연료 연소가 주된 원인입니다."
  },
  {
    id: 10,
    question: "What can be inferred from the statement: 'Although Jane had studied for weeks, she still felt unprepared for the exam.'?",
    options: [
      "Jane didn't study effectively.",
      "The exam was probably very difficult.",
      "Jane was overconfident about her abilities.",
      "Jane always feels unprepared before exams."
    ],
    answer: 1,
    explanation: "Jane이 몇 주 동안 공부했음에도 불구하고 여전히 준비가 안 된 것 같다고 느꼈다는 것에서, 시험이 매우 어려웠을 것이라고 추론할 수 있습니다."
  },
  // 어휘력 테스트
  {
    id: 11,
    question: "Choose the word that best completes the sentence: The weather forecast ____ rain for tomorrow, so don't forget your umbrella.",
    options: ["admits", "predicts", "confirms", "demands"],
    answer: 1,
    explanation: "'predict(예측하다)'이 날씨 예보와 문맥상 가장 적절합니다. 날씨 예보는 내일 비가 올 것을 '예측'합니다."
  },
  {
    id: 12,
    question: "Choose the word that is closest in meaning to 'ubiquitous'.",
    options: ["rare", "everywhere", "unusual", "unique"],
    answer: 1,
    explanation: "'ubiquitous'는 '어디에나 있는, 편재하는'이라는 뜻으로, 'everywhere(어디에나)'와 가장 의미가 가깝습니다."
  },
  // 신규 추가 문제 - 고등학교 수준
  {
    id: 13,
    question: "All the students in the class ____ working hard for the upcoming exam.",
    options: ["is", "are", "was", "were"],
    answer: 1,
    explanation: "주어가 'All the students'로 복수이므로 복수형 동사 'are'가 정답입니다."
  },
  {
    id: 14,
    question: "Read the following passage:\n\nMany scientists believe that artificial intelligence (AI) will eventually surpass human intelligence. Some predict this will happen within the next few decades. However, others argue that AI will never truly replicate human consciousness and creativity.\n\nWhat is the main controversy discussed in this passage?",
    options: [
      "Whether AI exists",
      "When AI was invented",
      "Whether AI will exceed human intelligence",
      "How to make AI more intelligent"
    ],
    answer: 2,
    explanation: "이 지문은 AI가 인간 지능을 능가할 것인지(일부는 그럴 것이라고 예측하고, 일부는 그렇지 않을 것이라고 주장함)에 대한 논쟁을 다루고 있습니다."
  },
  {
    id: 15,
    question: "Choose the correct passive voice form: 'They built this house in 1980.'",
    options: [
      "This house builds in 1980.",
      "This house was built in 1980.",
      "This house has built in 1980.",
      "This house is built in 1980."
    ],
    answer: 1,
    explanation: "능동태 문장 'They built this house in 1980.'의 수동태는 'This house was built in 1980.'입니다. 과거 시제이므로 'was built'를 사용합니다."
  },
  {
    id: 16,
    question: "Which of the following sentences uses a gerund correctly?",
    options: [
      "She enjoys to swim in the lake.",
      "They finished to write the report.",
      "He avoids driving during rush hour.",
      "I look forward to meeting with him."
    ],
    answer: 2,
    explanation: "'avoid' 다음에는 동명사가 와야 합니다. 'He avoids driving during rush hour.'가 동명사를 올바르게 사용한 문장입니다."
  },
  {
    id: 17,
    question: "What is the meaning of the idiomatic expression 'to beat around the bush'?",
    options: [
      "To win easily",
      "To avoid addressing the main point",
      "To search thoroughly",
      "To discuss something openly"
    ],
    answer: 1,
    explanation: "'beat around the bush'는 '요점을 피하다, 에둘러 말하다'라는 의미의 관용표현입니다."
  },
  {
    id: 18,
    question: "Choose the correct word order:\nI wonder ________.",
    options: [
      "where did he go",
      "where he did go",
      "where he go did",
      "where he went"
    ],
    answer: 3,
    explanation: "간접의문문에서는 주어+동사의 어순을 사용합니다. 'I wonder where he went.'가 올바른 형태입니다."
  },
  {
    id: 19,
    question: "Read the passage:\n\nDespite its small size, the hummingbird can fly at speeds greater than 15 meters per second. They can also hover in mid-air, fly backwards, and even upside down. Their wings beat at a rate of about 70 times per second.\n\nWhat is NOT mentioned as one of the hummingbird's flying abilities?",
    options: [
      "Hovering",
      "Flying backwards",
      "Flying upside down",
      "Flying in formation"
    ],
    answer: 3,
    explanation: "지문에서는 벌새의 공중 정지(hovering), 뒤로 날기(flying backwards), 거꾸로 날기(flying upside down)는 언급하지만, 편대비행(flying in formation)에 관해서는 언급하지 않습니다."
  },
  {
    id: 20,
    question: "Choose the correct reported speech for: 'I will call you tomorrow,' she said.",
    options: [
      "She said she will call me tomorrow.",
      "She said she would call me tomorrow.",
      "She said she would call me the next day.",
      "She said I would call her the next day."
    ],
    answer: 2,
    explanation: "직접화법에서 간접화법으로 전환할 때, 시제가 바뀌고(will→would) 시간 표현도 바뀝니다(tomorrow→the next day). 따라서 'She said she would call me the next day.'가 정답입니다."
  }
];

// 테스트 별 랜덤으로 10문제 선택하는 함수
export const getRandomQuestions = (testType: 'middle' | 'high'): Question[] => {
  const questions = testType === 'middle' ? middleSchoolQuestions : highSchoolQuestions;
  
  // 문제 배열 복사 및 섞기
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  
  // 앞에서 10개 문제 선택 (기존 5개에서 10개로 증가)
  return shuffled.slice(0, 10);
}; 