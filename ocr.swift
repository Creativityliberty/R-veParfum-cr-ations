import Vision
import Cocoa

func recognizeText(in imagePath: String) {
    let url = URL(fileURLWithPath: imagePath)
    guard let image = NSImage(contentsOf: url),
          let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        print("Could not load image: \(imagePath)")
        return
    }

    let request = VNRecognizeTextRequest { (request, error) in
        guard let observations = request.results as? [VNRecognizedTextObservation] else {
            print("No text found")
            return
        }

        print("--- \(url.lastPathComponent) ---")
        for observation in observations {
            guard let topCandidate = observation.topCandidates(1).first else { continue }
            print(topCandidate.string)
        }
        print("")
    }
    request.recognitionLevel = .accurate

    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    do {
        try handler.perform([request])
    } catch {
        print("Failed to perform OCR: \(error)")
    }
}

let arguments = CommandLine.arguments.dropFirst()
for arg in arguments {
    recognizeText(in: arg)
}
