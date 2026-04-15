import SwiftUI
import FamilyControls
import DeviceActivity
import FirebaseFirestore
import FirebaseAuth

@main
struct VitalityStreakApp: App {
    let center = AuthorizationCenter.shared
    
    init() {
        // Initialize Firebase here
        // FirebaseApp.configure()
        
        requestScreenTimeAuthorization()
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
    
    private func requestScreenTimeAuthorization() {
        Task {
            do {
                try await center.requestAuthorization(for: .individual)
                print("Successfully authorized Screen Time")
            } catch {
                print("Failed to authorize Screen Time: \(error)")
            }
        }
    }
}

struct ContentView: View {
    @State private var isPickerPresented = false
    @State private var selection = FamilyActivitySelection()
    
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "bolt.shield.fill")
                .resizable()
                .frame(width: 80, height: 80)
                .foregroundColor(.green)
            
            Text("Vitality Streak")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("iOS Usage Monitor")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            Divider()
            
            Text("This app monitors your social media usage to help you maintain your 16-hour vitality streak.")
                .multilineTextAlignment(.center)
                .padding()
            
            Button(action: { isPickerPresented = true }) {
                Label("Select Apps to Monitor", systemImage: "apps.iphone")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.green)
                    .cornerRadius(15)
            }
            .familyActivityPicker(isPresented: $isPickerPresented, selection: $selection)
            
            if !selection.applicationTokens.isEmpty {
                Text("\(selection.applicationTokens.count) Apps Selected")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
        .padding()
    }
}

// MARK: - Usage Sync Logic
class UsageSyncService {
    static let shared = UsageSyncService()
    private let db = Firestore.firestore()
    
    func updateUsage(platform: String, minutesToAdd: Int) {
        guard let userId = Auth.auth().currentUser?.uid else { return }
        
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        let dateString = formatter.string(from: Date())
        
        let statId = "\(userId)_\(dateString)"
        let docRef = db.collection("usage_stats").document(statId)
        
        docRef.setData([
            "userId": userId,
            "date": dateString,
            platform: FieldValue.increment(Int64(minutesToAdd))
        ], merge: true)
    }
}
