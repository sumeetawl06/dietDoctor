//
//  DietChartViewController.swift
//  dietdoctor
//
//  Created by Sumeet Agarwal on 14/10/20.
//

import UIKit

@objc
class DietChartViewController: UIViewController {
  
  @IBOutlet weak var languageLabel: UILabel!
  
  @objc var nutrition: Dictionary<String,Any>? = nil
  
  @IBOutlet weak var carbs: UILabel!
  @IBOutlet weak var fat: UILabel!
  @IBOutlet weak var protein: UILabel!
  @IBOutlet weak var calories: UILabel!
  @IBOutlet weak var fiber: UILabel!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    languageLabel.text = "Your current Language code is - \(NSLocale.preferredLanguages[0])"
    carbs.text = "\(String(describing: nutrition?["carbs"] ?? "0"))"
    fat.text = "\(String(describing: nutrition?["fat"] ?? "0"))"
    protein.text = "\(String(describing: nutrition?["protein"] ?? "0"))"
    calories.text = "\(String(describing: nutrition?["calories"] ?? "0"))"
    fiber.text = "\(String(describing: nutrition?["fiber"] ?? "0"))"
  }
  
  @IBAction func backTapped(_ sender: Any) {
    navigationController?.popViewController(animated: true)
  }
}
