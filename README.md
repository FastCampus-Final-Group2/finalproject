# GLT 코리아 배차 시스템

- FE 인원: 김령태, 이동희, 임혜정
- 작업 기간: 2024년 8월 12일 ~ 2024년 9월 20일

## 유저 세션, 탭 전환, 엑셀 업로드 및 가공, 팝업

### 1. 로그인, 로그아웃

- 로그인 정상 / 오류
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/ba8f5cbe-5653-4e1b-9ebc-d9cc05eff3c9/image.png)
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/797c36f6-8882-4b33-8a7c-0fcd7a6acbf4/image.png)
  - `LocalStorage API`: 간단한 아이디 저장 기능 구현
  - `React Hook Form`: validation 로직, form handling 최적화
  - `Recoil - Atom`: 로그인 시 유저 정보를 Atom에 저장함으로써 유저 세션 관리를 통해 페이지 접근 제한

### 2. 탭 전환

- 탭 전환 배차관리 / 차량관제
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/1be0f7ab-fd36-48ca-8b7d-da45dfbf46c2/002ff0e6-0142-4e67-a54b-c0c13ec93647.png)
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/330bd367-12a5-4e22-b9b4-8fe943814ae4/13561ead-7e78-418d-ba4a-7406d51eff8d.png)
  - `Session Storage API`: 메뉴에서 페이지 이동을 할 때마다 Session Storage에 탭 정보 저장
  - `Recoil` : 페이지 별로 필요한 상태를 전역상태로 관리함으로써 이후 다시 탭을 방문했을때 기존의 작업하던 부분을 다시 랜더링

### 3. Axios 설정

- Axios 코드
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/67d17aa0-660d-4aec-8a87-379a8301a37c/79298435-64b0-473e-9424-4e04a16e8549.png)
  - `Axios` : 비동기 요청시 기본적으로 삽입되어야할 설정을 미리 추가하여 반복되는 코드 제거

### 4. 엑셀 주문 리스트

- 엑셀 화면
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/35b00760-f09f-4af4-81fd-48ee6e7a768a/image.png)
  - `Recoil - Atom, Selector, SelectorFamily` : 필요한 컴포넌트만 rerendering 되도록 최적화
- Debounce 코드
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/14c7bed9-9191-4b2b-a8b4-6323229ae5fc/fdb90996-3f3d-44ed-aef5-12f1b803c5fc.png)
  - `Debounce` : 리액트 생명 주기를 이용해 Debounce를 적용하여 마지막 onChange 이벤트를 기준으로 Validation API 호출하여 과한 API 호출 방지

### 5. 팝업

- 상세정보 팝업
  ![팝업_배송처상세정보.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/9899f1c2-8dcb-47f0-92ef-9a06070927b9/%ED%8C%9D%EC%97%85_%EB%B0%B0%EC%86%A1%EC%B2%98%EC%83%81%EC%84%B8%EC%A0%95%EB%B3%B4.png)
  - `Context API` : 팝업 내부에서 Context API로 수정 가능한 정보를 관리함으로써 Props Drilling 해소 및 필요한 경우에만 Context 생성
- Confirm 팝업
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/fa871b1c-2793-404f-a43e-760cfe970e52/6a6b707b-c38c-495e-b0f7-fde94b0bad68.png)
  - 여러가지 Confirm 팝업을 하나의 컴포넌트로 제작하여 반복되는 코드를 줄이고 유지/보수를 용이하게 함

### 6. 네이버 맵

- 네이버 맵
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/2a5866ef-0fed-448c-9e4b-179466790261/bc826861-efb7-4e72-a024-6486c280b45a.png)
  - `Recoil - Atom, Selector, SelectorFamily` : 필요한 경로만 rerendering 되도록 최적화
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/ad7111b6-244a-49fe-84c4-28daedc0e085/5c865a84-c624-40a4-98fe-ac320690405c.png)
  - 보류 주문 클릭시 보류 주문 마커가 중앙으로 이동함으로써 사용자가 더 쉽게 보류주문의 위치를 확인 가능

## 배차 관리

### 1. 기사 정보 대시 보드

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/3eef390a-2f74-43d0-b9b7-9e17b32b9e12/b0880121-2fca-45d6-b83c-b486dd11e6b3.png)

- **`Recoil -atom`**: 전역 상태 관리를 사용하여 각 컴포넌트 별로 필요한 데이터만 전달하여 렌더링

### 2. 기사 상세 정보 사이드 탭

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/e96be5c3-270a-4a9b-bdd7-e4bbbe4bb62b/image.png)

- **`Recoil -atom`**: 전역 상태로 개별 기사의 사이드 탭 버튼 색상 별로 BG 색상 변동

### 3. 오류 주문 필터링

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/9b4d5f0a-538d-4532-9802-c2628674696f/image.png)

- 오류 코드가 true인 값들만 필터링 하며 개수를 카운트하여 렌더링
- **`useEffect`**: 드래그 앤 드롭으로 오류 주문을 이동하여 카운트가 0이 되면 필터링 스위치가 off로 자동으로 변경되며 막아버림

### 4. 드래그 앤 드롭

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/ba5a7b62-4fb8-4e40-9393-35e14c6af4d2/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/95d0bb79-eab6-458c-a4ad-0fe558c29466/image.png)

- **`react-beautiful-dnd`**: 최상단 컴포넌트에 DragDropContext를 래핑하고 StrictModeDroppable, Draggable를 추가로 래핑 함으로 드래그 할 수있는 영역과 드롭 받을 수 있는 영역을 지정하여 드래그 앤 드롭이 가능하게 만듬
- DragDropContext 컴포넌트에 onDragEnd함수를 적용하여 데이터가 이동할 때 어떤 동작을 하는지 선언
- **`axios, useEffect`**: 최초 렌더링이 될 때 최적의 경로를 요청하는 api body값을 객체에 담고 드래그 앤 드롭이 발생하여 body값에 변화를 감지하면 axios를 사용하여 api요청
- 그리고 응답 받은 데이터를 recoil 전역 상태에 다시 업데이트하는 로직으로 데이터 관리

### 5. 배차 확정

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/f00d5288-52fe-4fb2-9ac3-fb7243173e81/image.png)

- **`axios`**: 확정 버튼을 누르면 변화된 데이터들로 api 요청

## 배차 관제

### 1. 배차 목록 검색 페이지

![2024-09-18 00 53 00.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/96a7160b-a4aa-4b57-8171-cd45083baf0d/2024-09-18_00_53_00.png)

- **`메모이제이션 적용`**: 검색 결과 출력에 대해 useCallback을 적용해 기존 검색 결과를 메모이제이션해 두고, 날짜, 검색 키워드, 내 담당 주문 여부 등이 바뀔 때 바뀐 부분에 대해서만 결과를 화면에 출력할 수 있게 함.
- **`디바운스(Debounce) 적용`**: 화면 출력 상태를 검색 날짜, 옵션 등을 클릭했을 때 그 결과에 따른 ‘refetch’에 의존하게 만들었기 때문에, 텍스트 검색 시에는 타이핑할 때마다 결과물이 나오는 불상사가 일어나지 않도록 10분간의 디바운스를 적용함.

### 2. 특정 배차 상세 페이지

![2024-09-20 11 57 15.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/bed8cf5c-4d9a-4d5b-a8a5-d1d887957cb3/2024-09-20_11_57_15.png)

- **`기사별 색상 연동`**: 배차 관리와 마찬가지로 기사 클릭 시 선택한 색상을 내려받아 테마 색상으로 출력할 수 있게 함
- **`페이지 상태 유지`**: 탭 이동 시 배차 검색 페이지 혹은 배차 상세 페이지 접속 상태를 유지할 수 있도록 Recoil atom 및 Recoil Reset(배차목록 보기) 기능을 적용

![2024-09-18 00 15 23.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/e52eb842-f717-4062-9ecc-9c5cb69949e1/2024-09-18_00_15_23.png)

![2024-09-18 01 24 11.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/569c15e7-8632-4c65-9998-3c38631628f8/2024-09-18_01_24_11.png)

- **`switch-case 적용`**: 다양한 운송 상태(status)를 처리하기 위해 케이스에 따라 다른 텍스트와 색상이 출력될 수 있게 함

![2024-09-20 12 21 03.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/6f48308f-619c-45e6-8300-a545e8885ad3/2024-09-20_12_21_03.png)

![2024-09-20 12 21 27.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/f3c35bd8-c45e-40f3-865f-7783f6c4fbb3/2024-09-20_12_21_27.png)

- **`React.Fragment`**: 이미 매핑된 운송 목록 사이에 ‘이동 중’, ‘휴게 중’ 컴포넌트를 **끼워넣기 위해** React.Fragment를 이용해 특정 조건에 해당하는 경우에만 원하는 컴포넌트가 보일 수 있게 함.

![2024-09-20 11 37 33.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/859aff3d-55ff-47a1-b0e1-54fff66ab2e3/8964354f-28b9-4a6e-9098-ca48a1690799/2024-09-20_11_37_33.png)

- **`2개의 다른 API의 정보를 시각적으로 연결`**: 2개의 다른 API가 지닌 동일한 정보(특정 기사의 운송 ID, 운송 목록의 운송 상세 ID)를 이용해, 대시보드의 이슈 항목을 클릭할 경우 ID 값이 일치하는 컴포넌트가 강조될 수 있게 연동함.
