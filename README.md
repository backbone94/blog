# 📝 Blog Project

Blog는 사용자의 글쓰기, 댓글 달기, 이미지 업로드, 반응형 웹, 다크 모드 등의 기능을 제공하는 CRUD 웹 애플리케이션입니다. 이 프로젝트는 개인의 기록을 저장할 수 있는 공간을 제공하기 위해 개발되었습니다.

## 🌟 주요 기능 (Features)

### 카테고리 및 폴더 생성
사용자가 원하는 카테고리와 폴더를 생성하여 글을 정리할 수 있습니다.
### 글쓰기 및 댓글 달기
사용자가 글을 작성하고, 다른 사용자들이 댓글을 달 수 있는 기능을 제공합니다.
### S3 이미지 업로드
사용자는 AWS S3에 이미지를 업로드하고 이를 블로그 글에 추가할 수 있습니다.
### 반응형 웹(모바일)
다양한 기기에서도 최적화된 화면을 제공하는 반응형 웹 디자인을 적용했습니다.
### 다크모드 지원
사용자 경험을 향상시키기 위해 다크 모드를 지원합니다.

## 🛠️ 기술 스택 (Tech Stack)

![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux Saga](https://img.shields.io/badge/Redux%20Saga-%23764ABC.svg?style=for-the-badge&logo=redux-saga&logoColor=white)
![Express](https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS EC2](https://img.shields.io/badge/AWS%20EC2-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS%20S3-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## 🌐 GitHub 및 배포 사이트

- **GitHub Repository**: [https://github.com/backbone94/blog](https://github.com/backbone94/blog)
- **AWS EC2 사이트**: [http://3.34.156.241](http://3.34.156.241) (현재 AWS 프리티어의 기간이 만료되어서 접속이 불가합니다.)

## 📖 프로젝트 소개

Blog 프로젝트는 저의 첫 CRUD 웹사이트 프로젝트입니다. 개발자로서 자신의 기록을 저장할 수 있는 공간이 필요하다고 생각하여 이 프로젝트를 시작했습니다. 이 프로젝트를 통해 SPA(Single Page Application)를 React로 구성하고, Redux Saga를 사용하여 서버와의 비동기 통신을 구현하였습니다. 글쓰기 기능을 위해 CKEditor를 활용하고, AWS S3를 통해 이미지를 저장할 수 있도록 개발하였습니다. 또한, AWS EC2를 이용해 애플리케이션을 실제 배포하여 배포 과정까지 경험했습니다.

프론트엔드 개발자가 되는 것이 목표이지만, 이번 프로젝트를 통해 Node.js 환경에서 백엔드 개발을 경험할 수 있었고, JavaScript의 다양한 가능성을 체험할 수 있었습니다. 아직 미흡한 점이 많아, 앞으로 코드 리팩토링 및 기능 추가를 통해 블로그를 더욱 개선할 계획입니다.

## 🛠️ 설치 및 실행 방법

1. 리포지토리 클론
```bash
git clone https://github.com/backbone94/blog.git
cd blog
```

2. 의존성 설치
```bash
npm install
```

3. 서버 실행
```bash
npm start
```

브라우저에서 http://localhost:3000으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 📝 사용법
### 카테고리 생성
새로운 카테고리와 폴더를 생성하여 블로그 글을 체계적으로 정리할 수 있습니다.
### 글 작성
'글쓰기' 버튼을 눌러 새 글을 작성하고, 작성된 글에 댓글을 달 수 있습니다.
이미지 업로드: 글 작성 시 AWS S3에 이미지를 업로드하여 블로그 글에 추가할 수 있습니다.
### 반응형 웹
모바일, 태블릿, 데스크탑 등 다양한 기기에서 최적화된 화면을 제공합니다.
### 다크모드 사용
사용자 환경에 따라 다크 모드로 전환할 수 있습니다.
