# GLT 코리아 배차 시스템

<br/>
<div align="center">
  <a href="https://gltkorea.site/" target="_blank">
    <img src="https://img.shields.io/badge/GLT&nbsp;KOREA-274BD8?style=for-the-badge&&logoColor=white"/>
  </a>
</div>
<br/>

<div align="center">
<a href="https://github.com/user-attachments/files/17071877/_._.xlsx" target="_blank">
  <img src="https://img.shields.io/badge/엑셀 샘플 다운로드(직접 업로드하며 사용해 보세요!)-gray?style=flat-square&logoColor=white"/>
</a>
</div>

<br/>

```
아이디: 123456789
비밀번호: testadmin123
```

<br/><br/>

## 팀원 소개

<br/>

<div align="center">
<table>
  <tr>
    <td align="center">김령태</td>
    <td align="center">이동희</td>
    <td align="center">임혜정</td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/89022828?v=4" width="150"></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/98334298?v=4" width="150"></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/159132230?v=4" width="150"></td>
  </tr>
  <tr>
    <td align="center">각종 개발환경 세팅, 배차 관리의 엑셀 업로드 및 유효성 검사, 모달창, 네이버 맵</td>
    <td align="center">배차 관리(운송 경로 수정) 및 확정 페이지, 드래그 앤드 드롭, 네이버 맵</td>
    <td align="center">배차 관제 페이지(배차 정보 검색, 배차 상세 확인, 기사별 상세 정보 등), 네이버 맵</td>
  </tr>
</table>
</div>

<br/>

- **작업 기간**: 2024년 8월 12일 ~ 2024년 9월 20일
- **작업 내용**: 유저 세션, 탭 전환, 엑셀 업로드 및 가공, 팝업, 배차 관리, 배차 관제, 차량 관제, 지도 경로 표시 등 **물류 관리자를 위한 배차 관리 페이지** 개발
- **사용 도구**:

  - 프레임워크: <img src="https://img.shields.io/badge/Next.Js-000000?style=flat-square&logo=nextdotjs&logoColor=white"/>
  - 언어: <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  - 스타일: <img src="https://img.shields.io/badge/Tailwind&nbsp;CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
  - 코드 포맷팅: <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white"/>
  - 상태 관리: <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=white"/>
  - 비동기 통신: <img src="https://img.shields.io/badge/Tanstack&nbsp;Query-FF4154?style=flat-square&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
  - 배포: <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/>
  - 버전 관리: <img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white"/>

    <br/><br/>

## 유저 세션, 탭 전환, 엑셀 업로드 및 가공, 팝업

### 1. 로그인, 로그아웃

- 로그인 정상 / 오류
  <p float="left">
    <a href="https://github.com/user-attachments/assets/7ce49398-b605-487a-b566-1f661b7bcdec" target="_blank">
      <img src="https://github.com/user-attachments/assets/7ce49398-b605-487a-b566-1f661b7bcdec" width="49%" />
    </a>
    <a href="https://github.com/user-attachments/assets/19f4e6bf-a669-4be0-b98f-c20912276a40" target="_blank">
      <img src="https://github.com/user-attachments/assets/19f4e6bf-a669-4be0-b98f-c20912276a40" width="49%" />
    </a>
  </p>

  - **`LocalStorage API`**: 간단한 아이디 저장 기능 구현
  - **`React Hook Form`**: validation 로직, form handling 최적화
  - **`Recoil - Atom`**: 로그인 시 유저 정보를 Atom에 저장함으로써 유저 세션 관리를 통해 페이지 접근 제한

### 2. 탭 전환

- 탭 전환 배차관리 / 차량관제
  <p float="left">
    <a href="https://github.com/user-attachments/assets/1ef2cf4e-4000-4fa4-87b9-108fe0eff0a7" target="_blank">
      <img src="https://github.com/user-attachments/assets/1ef2cf4e-4000-4fa4-87b9-108fe0eff0a7" width="49%" />
    </a>
    <a href="https://github.com/user-attachments/assets/b5793aa4-89bc-4576-b745-2bc44f0be108" target="_blank">
      <img src="https://github.com/user-attachments/assets/b5793aa4-89bc-4576-b745-2bc44f0be108" width="49%" />
    </a>
  </p>

- **`Session Storage API`**: 메뉴에서 페이지 이동을 할 때마다 Session Storage에 탭 정보 저장
- **`Recoil`**: 페이지 별로 필요한 상태를 전역상태로 관리함으로써 이후 다시 탭을 방문했을때 기존의 작업하던 부분을 다시 랜더링

### 3. Axios 설정

- Axios 코드
  <p float="left">
    <a href="https://github.com/user-attachments/assets/09ff75ec-dec2-40fa-b8d1-7da940f34fa4" target="_blank">
      <img src="https://github.com/user-attachments/assets/09ff75ec-dec2-40fa-b8d1-7da940f34fa4" width="70%" />
    </a>
  </p>

  - **`Axios`**: 비동기 요청시 기본적으로 삽입되어야할 설정을 미리 추가하여 반복되는 코드 제거

### 4. 엑셀 주문 리스트

- 엑셀 화면
  <p float="left">
    <a href="https://github.com/user-attachments/assets/0ecc6b91-64a3-40dd-acbb-1b30c12bd3df" target="_blank">
      <img src="https://github.com/user-attachments/assets/0ecc6b91-64a3-40dd-acbb-1b30c12bd3df" width="100%" />
    </a>
  </p>

  - **`Recoil - Atom, Selector, SelectorFamily`**: 필요한 컴포넌트만 rerendering 되도록 최적화

- Debounce 코드
  <p float="left">
    <a href="https://github.com/user-attachments/assets/fcb00cf6-5904-40b1-94e8-1a0ff3c13c51" target="_blank">
      <img src="https://github.com/user-attachments/assets/fcb00cf6-5904-40b1-94e8-1a0ff3c13c51" width="70%" />
    </a>
  </p>

  - **`Debounce`**: 리액트 생명 주기를 이용해 Debounce를 적용하여 마지막 onChange 이벤트를 기준으로 Validation API 호출하여 과한 API 호출 방지

### 5. 팝업

- 상세정보 팝업
  <p float="left">
    <a href="https://github.com/user-attachments/assets/84a5a779-df73-4b16-a799-6a9f8d326c78" target="_blank">
      <img src="https://github.com/user-attachments/assets/84a5a779-df73-4b16-a799-6a9f8d326c78" width="50%" />
    </a>
  </p>

  - **`Context API`**: 팝업 내부에서 Context API로 수정 가능한 정보를 관리함으로써 Props Drilling 해소 및 필요한 경우에만 Context 생성
    <br/>

- Confirm 팝업
  <p float="left">
    <a href="https://github.com/user-attachments/assets/7419e94c-a724-424c-836b-daf08ddac061" target="_blank">
      <img src="https://github.com/user-attachments/assets/7419e94c-a724-424c-836b-daf08ddac061" width="50%" />
    </a>
  </p>

  - 여러가지 Confirm 팝업을 하나의 컴포넌트로 제작하여 반복되는 코드를 줄이고 유지/보수를 용이하게 함

### 6. 네이버 맵

- 네이버 맵
  <p float="left">
    <a href="https://github.com/user-attachments/assets/d6d6c999-181f-43f9-b1c4-f754972626ac" target="_blank">
      <img src="https://github.com/user-attachments/assets/d6d6c999-181f-43f9-b1c4-f754972626ac" width="100%" />
    </a>
  </p>

  - **`Recoil - Atom, Selector, SelectorFamily`**: 필요한 경로만 rerendering 되도록 최적화

  <p float="left">
    <a href="https://github.com/user-attachments/assets/8b39f55f-f137-43dc-9608-e9afd8b080d9" target="_blank">
      <img src="https://github.com/user-attachments/assets/8b39f55f-f137-43dc-9608-e9afd8b080d9" width="100%" />
    </a>
  </p>

  - 보류 주문 클릭시 보류 주문 마커가 중앙으로 이동함으로써 사용자가 더 쉽게 보류주문의 위치를 확인 가능

<br/><br/>

## 배차 관리

### 1. 기사 정보 대시 보드

<p float="left">
  <a href="https://github.com/user-attachments/assets/a1efb48b-639e-4046-aed6-e119b8df346c" target="_blank">
    <img src="https://github.com/user-attachments/assets/a1efb48b-639e-4046-aed6-e119b8df346c" width="50%" />
  </a>
</p>

- **`Recoil -atom`**: 전역 상태 관리를 사용하여 각 컴포넌트 별로 필요한 데이터만 전달하여 렌더링

### 2. 기사 상세 정보 사이드 탭

<p float="left">
  <a href="https://github.com/user-attachments/assets/85fdf4a7-974c-4206-aa11-9b4855c32f36" target="_blank">
    <img src="https://github.com/user-attachments/assets/85fdf4a7-974c-4206-aa11-9b4855c32f36" width="50%" />
  </a>
</p>

- **`Recoil -atom`**: 전역 상태로 개별 기사의 사이드 탭 버튼 색상 별로 BG 색상 변동

### 3. 오류 주문 필터링

<p float="left">
  <a href="https://github.com/user-attachments/assets/9aa7ce12-89d5-4d62-bc41-749180a09b4d" target="_blank">
    <img src="https://github.com/user-attachments/assets/9aa7ce12-89d5-4d62-bc41-749180a09b4d" width="50%" />
  </a>
</p>

- 오류 코드가 true인 값들만 필터링 하며 개수를 카운트하여 렌더링
- **`useEffect`**: 드래그 앤 드롭으로 오류 주문을 이동하여 카운트가 0이 되면 필터링 스위치가 off로 자동으로 변경되며 막아버림

### 4. 드래그 앤 드롭

<p float="left">
  <a href="https://github.com/user-attachments/assets/37039632-e383-4184-b931-564b66aea724" target="_blank">
    <img src="https://github.com/user-attachments/assets/37039632-e383-4184-b931-564b66aea724" width="90%" />
  </a>
  <a href="https://github.com/user-attachments/assets/193193f5-edf4-4d18-a0f3-0da3af660580" target="_blank">
    <img src="https://github.com/user-attachments/assets/193193f5-edf4-4d18-a0f3-0da3af660580" width="50%" />
  </a>
</p>

- **`react-beautiful-dnd`**: 최상단 컴포넌트에 DragDropContext를 래핑하고 StrictModeDroppable, Draggable를 추가로 래핑 함으로 드래그 할 수있는 영역과 드롭 받을 수 있는 영역을 지정하여 드래그 앤 드롭이 가능하게 만듬
- DragDropContext 컴포넌트에 onDragEnd함수를 적용하여 데이터가 이동할 때 어떤 동작을 하는지 선언
- **`axios, useEffect`**: 최초 렌더링이 될 때 최적의 경로를 요청하는 api body값을 객체에 담고 드래그 앤 드롭이 발생하여 body값에 변화를 감지하면 axios를 사용하여 api요청
- 그리고 응답 받은 데이터를 recoil 전역 상태에 다시 업데이트하는 로직으로 데이터 관리

### 5. 배차 확정

![image16-1](https://github.com/user-attachments/assets/9f4e9c64-a4f6-4e87-aa39-b0ae367503e9)

- **`axios`**: 확정 버튼을 누르면 변화된 데이터들로 api 요청

<br/><br/>

## 배차 관제

### 1. 배차 목록 검색 페이지

![image17](https://github.com/user-attachments/assets/ee58e30f-76f4-439d-bcf2-716defe6f2bb)

- **`메모이제이션 적용`**: 검색 결과 출력에 대해 useCallback을 적용해 기존 검색 결과를 메모이제이션해 두고, 날짜, 검색 키워드, 내 담당 주문 여부 등이 바뀔 때 바뀐 부분에 대해서만 결과를 화면에 출력할 수 있게 함.
- **`디바운스(Debounce) 적용`**: 화면 출력 상태를 검색 날짜, 옵션 등을 클릭했을 때 그 결과에 따른 'refetch'에 의존하게 만들었기 때문에, 텍스트 검색 시에는 타이핑할 때마다 결과물이 나오는 불상사가 일어나지 않도록 10분간의 디바운스를 적용함.

### 2. 특정 배차 상세 페이지

![image18](https://github.com/user-attachments/assets/35f60eca-25b8-45ac-92e3-6e67a8f52d56)

- **`기사별 색상 연동`**: 배차 관리와 마찬가지로 기사 클릭 시 선택한 색상을 내려받아 테마 색상으로 출력할 수 있게 함
- **`페이지 상태 유지`**: 탭 이동 시 배차 검색 페이지 혹은 배차 상세 페이지 접속 상태를 유지할 수 있도록 Recoil atom 및 Recoil Reset(배차목록 보기) 기능을 적용

<p float="left">
  <a href="https://github.com/user-attachments/assets/35fa8993-bf99-478c-9658-9d8401706894" target="_blank">
    <img src="https://github.com/user-attachments/assets/35fa8993-bf99-478c-9658-9d8401706894" width="100%" />
  </a>
  <a href="https://github.com/user-attachments/assets/afc1d6c9-1a7a-4c7a-a260-b1b804909ad6" target="_blank">
    <img src="https://github.com/user-attachments/assets/afc1d6c9-1a7a-4c7a-a260-b1b804909ad6" width="50%" />
  </a>
</p>

- **`switch-case 적용`**: 다양한 운송 상태(status)를 처리하기 위해 케이스에 따라 다른 텍스트와 색상이 출력될 수 있게 함

<p float="left">
  <a href="https://github.com/user-attachments/assets/0a4cd981-e9b0-4492-bd7c-7fb4d09a925d" target="_blank">
    <img src="https://github.com/user-attachments/assets/0a4cd981-e9b0-4492-bd7c-7fb4d09a925d" width="64%" />
  </a>
  <a href="https://github.com/user-attachments/assets/53779508-61a3-4885-8fcf-bbf69993a8b8" target="_blank">
    <img src="https://github.com/user-attachments/assets/53779508-61a3-4885-8fcf-bbf69993a8b8" width="35%" />
  </a>
</p>

- **`React.Fragment`**: 이미 매핑된 운송 목록 사이에 '이동 중', '휴게 중' 컴포넌트를 **끼워넣기 위해** React.Fragment를 이용해 특정 조건에 해당하는 경우에만 원하는 컴포넌트가 보일 수 있게 함.

<p float="left">
  <a href="https://github.com/user-attachments/assets/25ea3158-e887-456b-b556-dc2e481fdfb4" target="_blank">
    <img src="https://github.com/user-attachments/assets/25ea3158-e887-456b-b556-dc2e481fdfb4" width="50%" />
  </a>
</p>

- **`2개의 다른 API의 정보를 시각적으로 연결`**: 2개의 다른 API가 지닌 동일한 정보(특정 기사의 운송 ID, 운송 목록의 운송 상세 ID)를 이용해, 대시보드의 이슈 항목을 클릭할 경우 ID 값이 일치하는 컴포넌트가 강조될 수 있게 연동함.
